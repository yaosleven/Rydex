import type { CollectionEntry } from 'astro:content';
import { applyWebflowContent, escapeHtml } from '../utils/webflow-content';

type ModelData = CollectionEntry<'models'>['data'];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceSpecification(markup: string, fromLabel: string, fromValue: string, toLabel: string, toValue: string): string {
  const label = escapeRegExp(fromLabel);
  const value = escapeRegExp(fromValue);
  const pattern = new RegExp(
    `(<div\\b[^>]*class="model-spec-item"[^>]*>\\s*<div>)${label}(</div>\\s*<div\\b[^>]*class="model-specs-divider"[^>]*></div>\\s*<div\\b[^>]*class="pure-color-text"[^>]*>)${value}(</div>)`,
    'g',
  );
  return markup.replace(pattern, `$1${escapeHtml(toLabel)}$2${escapeHtml(toValue)}$3`);
}

/** Replaces each model's long description and labelled specification rows safely by their Webflow context. */
export function applyModelContent(markup: string, data: ModelData): string {
  if (!data.original) return markup;
  let output = data.original.summary
    ? applyWebflowContent(markup, [[data.original.summary, data.summary ?? data.original.summary]])
    : markup;
  data.originalSpecifications.forEach((source, index) => {
    const target = data.specifications[index];
    if (target) output = replaceSpecification(output, source.label, source.value, target.label, target.value);
  });
  return output;
}
