import { createSubscription, getSubscription } from './api';

export const stripeService = {
  createSubscription,
  getSubscription
} as const;