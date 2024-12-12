import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const SUBSCRIPTION_PLANS = {
  BASIC: 'price_basic123',
  PRO: 'price_pro123',
  ENTERPRISE: 'price_enterprise123'
};