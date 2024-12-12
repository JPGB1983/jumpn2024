import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SignOut from '../components/SignOut';
import PricingCard from '../components/payments/PricingCard';
import { useAuth } from '../lib/auth';
import { SUBSCRIPTION_PLANS } from '../lib/services/stripe/config';

export default function PricingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <Link to="/company/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <SignOut />
                </>
              ) : (
                <Link
                  to="/company/signin"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that best fits your organization's hiring needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            {...SUBSCRIPTION_PLANS.BASIC}
          />
          <PricingCard
            {...SUBSCRIPTION_PLANS.PRO}
            isPopular
          />
          <PricingCard
            {...SUBSCRIPTION_PLANS.ENTERPRISE}
          />
        </div>
      </div>
    </div>
  );
}