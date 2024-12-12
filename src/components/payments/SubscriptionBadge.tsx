import React from 'react';
import { useSubscription } from '../../lib/services/stripe/hooks';
import { Crown, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SubscriptionBadge() {
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <Loader className="w-4 h-4 animate-spin" />
        <span>Loading subscription...</span>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-600">
          <span>Free Plan</span>
        </div>
        <Link 
          to="/pricing" 
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Upgrade to Pro
        </Link>
      </div>
    );
  }

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    past_due: 'bg-yellow-100 text-yellow-800',
    canceled: 'bg-red-100 text-red-800',
    incomplete: 'bg-gray-100 text-gray-800'
  };

  const statusColor = statusColors[subscription.status as keyof typeof statusColors];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Crown className="w-4 h-4 text-indigo-600" />
        <span className="font-medium">{subscription.plan.name} Plan</span>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        Next billing date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
      </div>
    </div>
  );
}