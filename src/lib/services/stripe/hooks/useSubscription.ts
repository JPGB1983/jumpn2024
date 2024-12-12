import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth';
import { getSubscription } from '../api/subscription';
import type { SubscriptionResponse } from '../types';
import toast from 'react-hot-toast';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSubscription() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getSubscription(user.uid);
        if (mounted) {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error loading subscription:', error);
        if (mounted) {
          // Don't show error toast for new users without subscription
          if (error.message !== 'Subscription not found') {
            toast.error('Failed to load subscription details');
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadSubscription();

    return () => {
      mounted = false;
    };
  }, [user]);

  return { subscription, isLoading };
}