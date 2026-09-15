export type WebflowReplacement = readonly [from: string, to: string];

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * Replaces only supplied content values. Markup, classes and interaction
 * attributes stay intact so high-fidelity Webflow styling is preserved.
 */
export function applyWebflowContent(markup: string, replacements: readonly WebflowReplacement[]): string {
  return replacements.reduce(
    (output, [from, to]) => (from === to ? output : output.split(from).join(escapeHtml(to))),
    markup,
  );
}
