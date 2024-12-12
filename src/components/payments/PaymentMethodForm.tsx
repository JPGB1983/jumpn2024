import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';

interface PaymentMethodFormProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export default function PaymentMethodForm({ onSubmit, isLoading }: PaymentMethodFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="p-4 border border-gray-200 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            onChange={handleChange}
          />
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
        disabled={isLoading || !!error}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                 transition-colors font-medium disabled:bg-gray-400"
      >
        {isLoading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </div>
  );
}