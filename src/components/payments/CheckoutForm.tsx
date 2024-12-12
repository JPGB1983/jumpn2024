import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { stripeService } from '../../lib/services/stripe';
import toast from 'react-hot-toast';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#aab7c4'
      },
      padding: '10px 12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

interface CheckoutFormProps {
  planId: string;
  planName: string;
  amount: number;
  onClose: () => void;
}

export default function CheckoutForm({ planId, planName, amount, onClose }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (cardError) {
        throw cardError;
      }

      await stripeService.createSubscription({
        planId,
        paymentMethodId: paymentMethod.id,
      });
      
      toast.success('Subscription created successfully!');
      onClose();
      navigate('/company/dashboard');
    } catch (err: any) {
      console.error('Payment failed:', err);
      setError(err.message || 'Payment failed. Please try again.');
      toast.error(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Subscribe to {planName} Plan
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-700">
            Amount to be charged: <span className="font-semibold">${amount}</span>/month
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="p-4 border border-gray-200 rounded-lg bg-white">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Lock className="w-4 h-4" />
        <span>Payments are secure and encrypted</span>
      </div>

      <button
        type="submit"
        disabled={isLoading || !stripe}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </form>
  );
}