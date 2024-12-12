import React, { useState } from 'react';
import { Clock, ExternalLink, Check, Briefcase, Star } from 'lucide-react';
import { getCountryName } from '../lib/utils/countries';

interface CandidateCardProps {
  candidate: {
    id: string;
    full_name: string;
    role: string;
    location: string;
    profile_image_url?: string;
    key_points?: string[];
  };
  onClick: (id: string) => void;
  selectedCountry: string;
}

export default function CandidateCard({ candidate, onClick, selectedCountry }: CandidateCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={() => onClick(candidate.id)}
      className="bg-card rounded-xl shadow-sm border border-border-card overflow-hidden
                 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer
                 relative"
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={handleFavorite}
          className="p-2 rounded-full bg-white shadow-md
                   transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className={`w-5 h-5 ${
              isFavorite 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          />
        </button>
      </div>

      <div className="flex justify-center pt-8 pb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-indigo-50">
          {candidate.profile_image_url ? (
            <img
              src={candidate.profile_image_url}
              alt={candidate.full_name}
              className="w-full h-full object-cover object-center rounded-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-4xl font-semibold text-gray-400">
                {candidate.full_name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          {candidate.full_name}
        </h3>
        <p className="text-indigo-600 text-center mb-6">{candidate.role?.toUpperCase()}</p>
        
        <div className="bg-gray-50/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center text-indigo-600 mb-1">
                <Clock className="w-4 h-4 mr-1" />
              </div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-900">
                {getCountryName(candidate.location)}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-indigo-600 mb-1">
                <Briefcase className="w-4 h-4" />
              </div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-semibold text-gray-900">{candidate.role}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 mb-2">Key Expertise:</h4>
          {candidate.key_points?.slice(0, 3).map((point, index) => (
            <div key={index} className="flex items-start bg-gray-50/50 rounded-lg p-3">
              <Check className="w-4 h-4 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-700">{point}</p>
            </div>
          ))}
        </div>
        
        <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 
                         bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                         transition-colors duration-200">
          View Full Profile
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}