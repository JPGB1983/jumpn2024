import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';

interface PricingCardProps {
  name: string;
  price: number | null;
  interval: string;
  features: string[];
  paymentLink?: string;
  isPopular?: boolean;
}

export default function PricingCard({
  name,
  price,
  interval,
  features,
  paymentLink,
  isPopular
}: PricingCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      navigate('/company/signup');
      return;
    }

    if (price === null) {
      window.location.href = 'mailto:sales@jumpn.com?subject=Enterprise Plan Inquiry';
      return;
    }

    if (paymentLink) {
      window.open(paymentLink, '_blank');
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border 
                    ${isPopular ? 'border-indigo-200' : 'border-gray-100'} 
                    flex flex-col relative`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 
                      rounded-bl-lg rounded-tr-lg text-sm font-medium">
          Popular
        </div>
      )}
      
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="mb-4">
          {price ? (
            <>
              <span className="text-3xl font-bold">${price}</span>
              <span className="text-gray-600">/{interval}</span>
            </>
          ) : (
            <span className="text-xl font-bold">Custom pricing</span>
          )}
        </div>
        
        <ul className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <Check className="w-5 h-5 text-indigo-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleClick}
        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg 
                 hover:bg-indigo-700 transition-colors font-medium"
      >
        {price ? 'Get Started' : 'Contact Sales'}
      </button>
    </div>
  );
}