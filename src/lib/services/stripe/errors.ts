export class StripeError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'StripeError';
  }
}

export class SubscriptionError extends StripeError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'SubscriptionError';
  }
}