import React from 'react';
import { X } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../lib/services/stripe/config';
import CheckoutForm from './CheckoutForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  amount: number;
}

const STRIPE_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
    },
  ],
};

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  planId, 
  planName, 
  amount 
}: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Complete Subscription</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Elements stripe={stripePromise} options={STRIPE_OPTIONS}>
          <CheckoutForm
            planId={planId}
            planName={planName}
            amount={amount}
            onClose={onClose}
          />
        </Elements>
      </div>
    </div>
  );
}