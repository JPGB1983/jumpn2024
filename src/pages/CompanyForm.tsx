import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Globe, Save, Upload } from 'lucide-react';
import { profileService } from '../lib/services/profile/profile.service';
import { useAuth } from '../lib/auth';
import DateInput from '../components/common/DateInput';
import { getCurrentDate, getMinDate } from '../lib/utils/date';
import toast from 'react-hot-toast';
import type { CompanyProfile } from '../types/database';

export default function CompanyForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
    industry: '',
    size: '',
    location: '',
    address: '',
    founded_date: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const profile = await profileService.getCompanyProfile(user.uid);
        
        if (profile) {
          setFormData({
            name: profile.name || '',
            website: profile.website || '',
            description: profile.description || '',
            industry: profile.industry || '',
            size: profile.size || '',
            location: profile.location || '',
            address: profile.address || '',
            founded_date: profile.founded_date || ''
          });
          if (profile.logo_url) {
            setPreviewLogo(profile.logo_url);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000 * (retryCount + 1)); // Exponential backoff
        } else {
          toast.error('Failed to load profile. Please refresh the page.');
        }
      }
    };

    loadProfile();
  }, [user, retryCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      founded_date: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to save your profile');
      return;
    }

    if (!formData.name || !formData.industry || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setRetryCount(0);

    try {
      
      const payload = {
        ...formData,
        email: user.email || '',
        updated_at: new Date().toISOString(), // Agregar updated_at aquí
      };

      const success = await profileService.saveCompanyProfile(
        user.uid,
        {
          ...formData,
          email: user.email || ''
        },
        logoFile || undefined
      );

      if (success) {
        navigate('/company/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large. Maximum size is 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setLogoFile(file);
    setPreviewLogo(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Company Profile
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form className="p-6" onSubmit={handleSave}>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo
              </label>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 relative">
                  {previewLogo ? (
                    <img
                      src={previewLogo}
                      alt="Company logo preview"
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
                        handleLogoChange(file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter company name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <DateInput
                label="Founded Date"
                value={formData.founded_date}
                onChange={handleDateChange}
                min={getMinDate(200)}
                max={getCurrentDate()}
                name="founded_date"
                className="w-full"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Full street address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Tell us about your company..."
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg 
                         hover:bg-indigo-700 transition-colors shadow-sm disabled:bg-gray-400"
              >
                <Save className="w-5 h-5" />
                {isLoading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}