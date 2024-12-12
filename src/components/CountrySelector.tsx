import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export const countries = [
  { code: 'us', name: 'United States' },
  { code: 'uk', name: 'United Kingdom' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'it', name: 'Italy' },
  { code: 'es', name: 'Spain' },
  { code: 'pt', name: 'Portugal' },
  { code: 'pl', name: 'Poland' },
  { code: 'sg', name: 'Singapore' },
];

interface CountrySelectorProps {
  selectedCountry: string;
  onSelect: (country: string) => void;
}

export default function CountrySelector({ selectedCountry, onSelect }: CountrySelectorProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Globe className="h-5 w-5 text-gray-400" />
      </div>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
      <select
        value={selectedCountry}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 text-base border-gray-200 rounded-lg appearance-none 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                 bg-white shadow-sm"
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}