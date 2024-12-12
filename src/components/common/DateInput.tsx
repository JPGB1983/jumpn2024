import React from 'react';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  name?: string;
  min?: string;
  max?: string;
}

export default function DateInput({
  label,
  value,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select a date',
  name,
  min,
  max
}: DateInputProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    onChange(formatDate(newDate));
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="date"
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          min={min}
          max={max}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}