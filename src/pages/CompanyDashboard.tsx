import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SignOut from '../components/SignOut';
import SubscriptionStatus from '../components/payments/SubscriptionStatus';
import { Building2, Users, MessageSquare, Search, Globe, Edit } from 'lucide-react';
import { profileService } from '../lib/services/profile/profile.service';
import { useAuth } from '../lib/auth';
import type { CompanyProfile } from '../types/database';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const data = await profileService.getCompanyProfile(user.uid);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching company profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="header">
        <div className="header-container">
          <Logo />
          <div className="flex items-center gap-6">
            <Link 
              to="/company/profile" 
              className="text-gray-600 hover:text-gray-900"
            >
              Edit Profile
            </Link>
            <SignOut />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Profile Overview */}
          <div className="md:col-span-1">
            <div className="card-shadow rounded-xl p-6">
              <div className="flex flex-col items-center">
                {profile?.logo_url ? (
                  <img
                    src={profile.logo_url}
                    alt={profile.name}
                    className="w-32 h-32 rounded-lg object-cover mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                    <Building2 className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {profile ? (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {profile.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{profile.industry}</p>
                    
                    {profile.website && (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                  </>
                ) : !isLoading && (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Complete your company profile to get started</p>
                    <Link
                      to="/company/profile"
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                    >
                      <Edit className="w-4 h-4" />
                      Create Profile
                    </Link>
                  </div>
                )}
              </div>

              {/* Subscription Status */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <SubscriptionStatus />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Link
                to="/search"
                className="card-shadow p-6 rounded-xl hover:scale-[1.02] transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 
                              group-hover:bg-indigo-100 transition-colors">
                  <Search className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Search Candidates</h3>
                <p className="text-sm text-gray-600">
                  Find and connect with top executive talent
                </p>
              </Link>

              <Link
                to="/company/profile"
                className="card-shadow p-6 rounded-xl hover:scale-[1.02] transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 
                              group-hover:bg-indigo-100 transition-colors">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {profile ? 'Update Profile' : 'Complete Profile'}
                </h3>
                <p className="text-sm text-gray-600">
                  {profile ? 'Update your company information' : 'Set up your company profile'}
                </p>
              </Link>
            </div>

            {/* Recent Activity */}
            {profile && (
              <div className="card-shadow rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">Profile created</p>
                      <p className="text-sm text-gray-600">
                        {new Date(profile.created_at.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">Ready to connect</p>
                      <p className="text-sm text-gray-600">Start searching for candidates</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}