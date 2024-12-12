export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    price: 99,
    interval: 'month',
    paymentLink: 'https://buy.stripe.com/test_aEUdTj2VJgmDaxq5kk',
    features: [
      'Up to 5 active searches',
      'Basic candidate filtering',
      'Email support'
    ]
  },
  PRO: {
    name: 'Pro',
    price: 299,
    interval: 'month',
    paymentLink: 'https://buy.stripe.com/test_eVa8yZ8g3dardJC145',
    features: [
      'Unlimited searches',
      'Advanced filtering',
      'Priority support',
      'Custom company page'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: null,
    interval: 'month',
    features: [
      'Unlimited everything',
      'Dedicated account manager',
      'Custom integration',
      '24/7 phone support'
    ]
  }
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;