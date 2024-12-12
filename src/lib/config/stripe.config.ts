export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    id: 'price_basic123',
    name: 'Basic',
    price: 99,
    interval: 'month',
    currency: 'USD',
    features: [
      'Up to 5 active searches',
      'Basic candidate filtering',
      'Email support'
    ]
  },
  PRO: {
    id: 'price_pro123',
    name: 'Pro',
    price: 299,
    interval: 'month',
    currency: 'USD',
    features: [
      'Unlimited searches',
      'Advanced filtering',
      'Priority support',
      'Custom company page'
    ]
  },
  ENTERPRISE: {
    id: 'price_enterprise123',
    name: 'Enterprise',
    price: null,
    interval: 'month',
    currency: 'USD',
    features: [
      'Unlimited everything',
      'Dedicated account manager',
      'Custom integration',
      '24/7 phone support'
    ]
  }
};