import { CreateSubscriptionParams, SubscriptionResponse } from './types';

const API_URL = '/api/subscriptions';

export const stripeApi = {
  async createSubscription({ planId, paymentMethodId }: CreateSubscriptionParams): Promise<SubscriptionResponse> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token
      },
      body: JSON.stringify({
        planId,
        paymentMethodId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create subscription');
    }

    return response.json();
  },

  async getSubscription(userId: string): Promise<SubscriptionResponse> {
    const response = await fetch(`${API_URL}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch subscription');
    }

    return response.json();
  }
};