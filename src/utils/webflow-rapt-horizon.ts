import source from '../reference/original-rapt-horizon.html?raw';
import { sanitizeWebflowBody } from './webflow-page';

const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (!bodyMatch) throw new Error('The downloaded Rapt Horizon source does not contain a body element.');

export const webflowRaptHorizon = sanitizeWebflowBody(bodyMatch[1], '/rapt-horizon.html');
