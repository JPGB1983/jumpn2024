import { auth } from '../firebase';
import type { CreateSubscriptionParams, SubscriptionResponse } from '../../types/stripe';

export const stripeService = {
  async createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResponse> {
    const token = await auth.currentUser?.getIdToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create subscription');
    }

    return response.json();
  },

  async getSubscription(userId: string): Promise<SubscriptionResponse> {
    const token = await auth.currentUser?.getIdToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`/api/subscriptions/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch subscription');
    }

    return response.json();
  }
};