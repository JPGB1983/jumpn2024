import React from 'react';
import { Globe, Upload } from 'lucide-react';

interface BasicInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  linkedinUrl: string;
  previewImage: string | null;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onLinkedinUrlChange: (value: string) => void;
  onImageChange: (file: File) => void;
}

export default function BasicInfo({
  firstName,
  lastName,
  email,
  linkedinUrl,
  previewImage,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onLinkedinUrlChange,
  onImageChange,
}: BasicInfoProps) {
  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 relative">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImageChange(file);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter first name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Your email address"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn Profile
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => onLinkedinUrlChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., https://linkedin.com/in/yourprofile"
          />
        </div>
      </div>
    </div>
  );
}