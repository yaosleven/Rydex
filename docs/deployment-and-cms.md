# GitHub + Cloudflare Pages + Decap CMS

This project is prepared for a Git-based publishing workflow:

`Decap CMS (/cms/)` → `GitHub commit to main` → `Cloudflare Pages build` → `published website`

The existing `/admin/` area remains a local draft and preview tool. The production editor will be `/cms/` after the setup below is complete.

## What is already prepared

- Astro static output: `dist/`
- Cloudflare-compatible build command: `npm run build`
- CMS UI at `/cms/`
- CMS content configuration: `public/cms/config.yml`
- OAuth Worker template: `cms-oauth-worker/`
- Security headers in `public/_headers`
- Local Git ignore rules for generated files and secrets

## One-time account setup

1. Create an empty GitHub repository, preferably private while the site is under construction.
2. Create a GitHub OAuth App at GitHub **Settings → Developer settings → OAuth Apps**.
3. Create a Cloudflare Pages project connected to that GitHub repository.
4. Create the Cloudflare Worker from `cms-oauth-worker/`.

Do not place OAuth secrets into Git, `config.yml`, or Cloudflare Pages variables. They belong only in the Worker secrets.

## Values to supply during final connection

| Value | Where it goes |
| --- | --- |
| GitHub owner/repository | `public/cms/config.yml` → `backend.repo` |
| Cloudflare Pages public URL or final domain | Cloudflare Pages variable `SITE_URL`; Worker variable `CMS_ORIGIN` |
| Worker URL | `public/cms/config.yml` → `backend.base_url` |
| GitHub OAuth Client ID | Worker secret `GITHUB_OAUTH_CLIENT_ID` |
| GitHub OAuth Client Secret | Worker secret `GITHUB_OAUTH_CLIENT_SECRET` |

## Cloudflare Pages build settings

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22` |
| Environment variable | `SITE_URL=https://your-public-domain` |

Cloudflare Pages automatically rebuilds after each push to `main`.

## OAuth Worker deployment

After signing in with `npx wrangler login`, set the three deployment values:

```powershell
npx wrangler secret put GITHUB_OAUTH_CLIENT_ID --config cms-oauth-worker/wrangler.jsonc
npx wrangler secret put GITHUB_OAUTH_CLIENT_SECRET --config cms-oauth-worker/wrangler.jsonc
npx wrangler deploy --config cms-oauth-worker/wrangler.jsonc
```

Before deploying, replace `CMS_ORIGIN` in `cms-oauth-worker/wrangler.jsonc` with the Pages URL or final domain. Use the Worker URL returned by deployment as `backend.base_url` in `public/cms/config.yml`.

For the GitHub OAuth App use:

- Homepage URL: the public site URL.
- Authorization callback URL: `https://YOUR_WORKER.workers.dev/callback`.

## CMS use after connection

Open `https://your-domain/cms/`, sign in with the authorized GitHub account, edit an entry, and publish. Decap creates a Git commit; Cloudflare Pages then builds the new public version.

New images uploaded by Decap are stored in `public/uploads/` and are served as `/uploads/...`.

## Safeguards

- Keep the GitHub repository private until all copied template branding and placeholder material are replaced.
- Give CMS access only to GitHub users who should be able to publish.
- Review the Cloudflare preview deployment before merging important marketing changes.
- The OAuth Worker uses a short-lived, HttpOnly verification cookie and does not store GitHub tokens.
