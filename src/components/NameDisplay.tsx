import React from 'react';

interface NameDisplayProps {
  fullName: string;
  className?: string;
}

export default function NameDisplay({ fullName, className = '' }: NameDisplayProps) {
  const names = fullName?.trim().split(/\s+/) || [];
  const firstName = names[0] || 'First';
  const lastName = names.slice(1).join(' ') || 'Last';

  return (
    <div className={`space-y-1 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 leading-tight">
        {firstName}
      </h2>
      <h2 className="text-xl font-semibold text-gray-900 leading-tight">
        {lastName}
      </h2>
    </div>
  );
}