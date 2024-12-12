import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

export default function SubscriptionStatus() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-2">Current Plan</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Free Plan</span>
        </div>
        <Link 
          to="/pricing"
          className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Upgrade your plan →
        </Link>
      </div>
    </div>
  );
}