import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Save } from 'lucide-react';
import Logo from '../components/Logo';
import SignOut from '../components/SignOut';
import { admin } from '../lib/supabase';

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    allowSignups: true,
    requireEmailVerification: true,
    maxCandidatesPerCompany: 50,
    maxCompanySize: 1000
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await admin.updateSettings(settings);
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-6">
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <SignOut />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                General Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Allow New Signups
                    </label>
                    <p className="text-sm text-gray-500">
                      Enable or disable new user registrations
                    </p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={settings.allowSignups}
                      onChange={(e) => setSettings({
                        ...settings,
                        allowSignups: e.target.checked
                      })}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Require Email Verification
                    </label>
                    <p className="text-sm text-gray-500">
                      Users must verify their email before accessing the platform
                    </p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={settings.requireEmailVerification}
                      onChange={(e) => setSettings({
                        ...settings,
                        requireEmailVerification: e.target.checked
                      })}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Platform Limits
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Candidates per Company
                  </label>
                  <input
                    type="number"
                    value={settings.maxCandidatesPerCompany}
                    onChange={(e) => setSettings({
                      ...settings,
                      maxCandidatesPerCompany: parseInt(e.target.value)
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Company Size
                  </label>
                  <input
                    type="number"
                    value={settings.maxCompanySize}
                    onChange={(e) => setSettings({
                      ...settings,
                      maxCompanySize: parseInt(e.target.value)
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg 
                       hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              <Save className="w-5 h-5" />
              {isLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}