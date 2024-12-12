import { loadStripe } from '@stripe/stripe-js';
import { stripeConfig } from '../config/stripe';

export const stripePromise = loadStripe(stripeConfig.publicKey);
export const SUBSCRIPTION_PLANS = stripeConfig.plans;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;