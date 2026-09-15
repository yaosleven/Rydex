import source from '../reference/original-models-2.html?raw';
import { sanitizeWebflowBody } from './webflow-page';

const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (!bodyMatch) throw new Error('The downloaded second Rydex Models source does not contain a body element.');

export const webflowModelsTwo = sanitizeWebflowBody(bodyMatch[1], '/models-2.html');
