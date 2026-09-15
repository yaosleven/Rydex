import source from '../reference/original-models.html?raw';
import { modelsAssetReplacements } from '../data/models-assets';
import { applyWebflowContent } from './webflow-content';
import { sanitizeWebflowBody } from './webflow-page';

const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (!bodyMatch) throw new Error('The downloaded Rydex Models source does not contain a body element.');

export const webflowModels = applyWebflowContent(
  sanitizeWebflowBody(bodyMatch[1], '/models.html'),
  modelsAssetReplacements,
);
