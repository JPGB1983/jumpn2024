import React from 'react';
import { ChevronDown } from 'lucide-react';

const positions = [
  { id: 'ceo', title: 'Chief Executive Officer (CEO)' },
  { id: 'cfo', title: 'Chief Financial Officer (CFO)' },
  { id: 'cto', title: 'Chief Technology Officer (CTO)' },
  { id: 'cmo', title: 'Chief Marketing Officer (CMO)' },
  { id: 'coo', title: 'Chief Operating Officer (COO)' },
  { id: 'cio', title: 'Chief Information Officer (CIO)' },
  { id: 'chro', title: 'Chief Human Resources Officer (CHRO)' },
  { id: 'cpo', title: 'Chief Product Officer (CPO)' },
  { id: 'cso', title: 'Chief Sales Officer (CSO)' },
  { id: 'clo', title: 'Chief Legal Officer (CLO)' },
  { id: 'cco', title: 'Chief Compliance Officer (CCO)' },
  { id: 'ciso', title: 'Chief Information Security Officer (CISO)' },
  { id: 'cdo', title: 'Chief Data Officer (CDO)' },
  { id: 'cro', title: 'Chief Revenue Officer (CRO)' },
  { id: 'cxo', title: 'Chief Experience Officer (CXO)' }
];

interface PositionSelectorProps {
  selectedPosition: string;
  onSelect: (position: string) => void;
}

export default function PositionSelector({ selectedPosition, onSelect }: PositionSelectorProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
      <select
        value={selectedPosition}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full px-4 py-3 text-base border-gray-200 rounded-lg appearance-none 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                 bg-white shadow-sm"
      >
        <option value="">Select Position</option>
        {positions.map((position) => (
          <option key={position.id} value={position.id}>
            {position.title}
          </option>
        ))}
      </select>
    </div>
  );
}