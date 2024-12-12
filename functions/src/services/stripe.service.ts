import { stripe } from '../config/stripe';
import type { Stripe } from 'stripe';

export const stripeService = {
  async createCustomer(email: string, paymentMethodId: string) {
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return customer;
  },

  async createSubscription(customerId: string, priceId: string) {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
  },

  async getSubscription(subscriptionId: string) {
    return await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method'],
    });
  },

  async cancelSubscription(subscriptionId: string) {
    return await stripe.subscriptions.cancel(subscriptionId);
  }
};