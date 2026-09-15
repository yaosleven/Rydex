import source from '../reference/original-home.html?raw';
import { homeAssetReplacements } from '../data/home-assets';
import { sanitizeWebflowBody } from './webflow-page';
import { applyWebflowContent } from './webflow-content';

const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (!bodyMatch) throw new Error('The downloaded Rydex Home source does not contain a body element.');

const sanitizedBody = applyWebflowContent(
  sanitizeWebflowBody(bodyMatch[1], '/'),
  homeAssetReplacements,
);

const sections = [...sanitizedBody.matchAll(/<section\b[\s\S]*?<\/section>/gi)].map(([markup]) => markup);

if (sections.length !== 8) {
  throw new Error(`Expected eight Home sections in the Rydex reference, received ${sections.length}.`);
}

const pageWrapperOpen = '<div class="page-wrapper">';
const wrapperIndex = sanitizedBody.indexOf(pageWrapperOpen);
const firstSectionIndex = sanitizedBody.indexOf(sections[0]);

if (wrapperIndex === -1 || firstSectionIndex === -1) {
  throw new Error('The Rydex Home reference has an unexpected page wrapper structure.');
}

export const webflowHome = {
  customCursor: sanitizedBody.slice(wrapperIndex + pageWrapperOpen.length, firstSectionIndex),
  hero: sections[0],
  about: sections[1],
  models: sections[2],
  benefits: sections[3],
  testimonials: sections[4],
  steps: sections[5],
  blog: sections[6],
  footer: sections[7],
} as const;
