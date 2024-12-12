import { auth } from '../../../config/firebase';
import { SubscriptionError } from '../errors';
import type { CreateSubscriptionParams, SubscriptionResponse } from '../types';

const API_URL = '/api/subscriptions';

async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user');
  }
  return user.getIdToken();
}

export async function createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResponse> {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new SubscriptionError(error.message || 'Failed to create subscription');
    }

    return response.json();
  } catch (error: any) {
    console.error('Subscription creation failed:', error);
    throw new SubscriptionError(error.message || 'Failed to create subscription');
  }
}

export async function getSubscription(userId: string): Promise<SubscriptionResponse> {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_URL}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new SubscriptionError(error.message || 'Failed to fetch subscription');
    }

    return response.json();
  } catch (error: any) {
    console.error('Failed to get subscription:', error);
    throw new SubscriptionError(error.message || 'Failed to fetch subscription');
  }
}