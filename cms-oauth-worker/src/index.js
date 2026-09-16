const githubTokenEndpoint = 'https://github.com/login/oauth/access_token';
const githubAuthorizeEndpoint = 'https://github.com/login/oauth/authorize';

function html(body) {
  return new Response(body, {
    headers: {
      'content-type': 'text/html; charset=UTF-8',
      'cache-control': 'no-store',
      'content-security-policy': "default-src 'none'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      'referrer-policy': 'no-referrer',
    },
  });
}

function cookie(request, name) {
  return request.headers.get('Cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
    if (url.pathname === '/') return html('<h1>Rydex CMS OAuth Worker</h1><p>Authentication endpoint is ready.</p>');

    if (url.pathname === '/auth') {
      const state = crypto.randomUUID();
      const callbackUrl = new URL('/callback', url.origin).toString();
      const authorizeUrl = new URL(githubAuthorizeEndpoint);
      authorizeUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID);
      authorizeUrl.searchParams.set('redirect_uri', callbackUrl);
      authorizeUrl.searchParams.set('scope', 'repo');
      authorizeUrl.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: {
          Location: authorizeUrl.toString(),
          'Set-Cookie': `rydex_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`,
          'Cache-Control': 'no-store',
        },
      });
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      if (!code || !state || state !== cookie(request, 'rydex_oauth_state')) return html('<p>Authentication state could not be verified. Close this window and try again.</p>');

      const callbackUrl = new URL('/callback', url.origin).toString();
      const tokenResponse = await fetch(githubTokenEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: env.GITHUB_OAUTH_CLIENT_ID, client_secret: env.GITHUB_OAUTH_CLIENT_SECRET, code, redirect_uri: callbackUrl }),
      });
      const payload = await tokenResponse.json();
      if (!tokenResponse.ok || !payload.access_token) return html('<p>GitHub sign-in failed. Close this window and try again.</p>');

      const message = JSON.stringify(`authorization:github:success:${JSON.stringify({ token: payload.access_token, provider: 'github' })}`);
      const cmsOrigin = JSON.stringify(env.CMS_ORIGIN);
      return html(`<!doctype html><title>Signing in</title><script>
        window.addEventListener('message', (event) => {
          if (event.origin !== ${cmsOrigin} || event.data !== 'authorizing:github') return;
          window.opener?.postMessage(${message}, event.origin);
          window.close();
        });
        window.opener?.postMessage('authorizing:github', '*');
      </script><p>Signing in…</p>`);
    }

    return new Response('Not Found', { status: 404 });
  },
};
