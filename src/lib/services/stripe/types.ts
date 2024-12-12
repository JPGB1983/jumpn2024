import type { Stripe } from '@stripe/stripe-js';

export interface CreateSubscriptionParams {
  planId: string;
  paymentMethodId: string;
}

export interface SubscriptionResponse {
  id: string;
  status: Stripe.Subscription.Status;
  current_period_end: number;
  plan: {
    id: string;
    name: string;
    amount: number;
  };
  default_payment_method?: Stripe.PaymentMethod;
}