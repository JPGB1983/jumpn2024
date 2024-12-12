export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number | null;
  interval: string;
  currency: string;
  features: string[];
}

export interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  current_period_end: string;
  plan: SubscriptionPlan;
  default_payment_method: PaymentMethod;
}