import { mswHandlers } from './handlers';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...mswHandlers);
