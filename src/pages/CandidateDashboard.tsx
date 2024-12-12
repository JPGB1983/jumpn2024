import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SignOut from '../components/SignOut';
import VideoPlayer from '../components/VideoPlayer';
import { Building2, MapPin, Globe, Linkedin, Video, Check, Briefcase, Trophy, Award } from 'lucide-react';
import { databaseService } from '../lib/services';
import { useAuth } from '../lib/auth';
import { getCountryName } from '../lib/utils/countries';
import toast from 'react-hot-toast';
import type { CandidateProfile, WorkExperience, Milestone } from '../types/database';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [imageError, setImageError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return;

      try {
        const { data: profileData, error: profileError } = await databaseService.candidates.getProfile(user.uid);
        if (profileError) throw profileError;
        
        const { data: experienceData, error: expError } = await databaseService.candidates.getWorkExperience(user.uid);
        if (expError) throw expError;
        
        setProfile(profileData);
        setExperiences(experienceData || []);
      } catch (error: any) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    loadProfileData();
  }, [user]);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!user || !profile) {
    return null;
  }

  const getMilestoneIcon = (type: Milestone['type']) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-green-600" />;
      case 'award':
        return <Award className="w-5 h-5 text-yellow-600" />;
      case 'certification':
        return <Check className="w-5 h-5 text-blue-600" />;
      case 'publication':
        return <Trophy className="w-5 h-5 text-purple-600" />;
      default:
        return <Trophy className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="header">
        <div className="header-container">
          <Logo />
          <div className="flex items-center gap-6">
            <Link 
              to="/candidate/profile" 
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
          {/* Profile Overview */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
                  {profile.profile_image_url && !imageError ? (
                    <img
                      src={profile.profile_image_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-4xl font-semibold text-gray-400">
                        {profile.full_name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {profile.full_name}
                  </h2>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-indigo-600">{profile.role?.toUpperCase()}</span>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{getCountryName(profile.location)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3 w-full mt-4">
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile
                    </a>
                  )}
                  
                  {profile.video_url && (
                    <button 
                      onClick={() => setShowVideo(true)}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                    >
                      <Video className="w-4 h-4" />
                      Watch Introduction
                    </button>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {experiences.length}
                      </div>
                      <div className="text-sm text-gray-600">Positions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {profile.key_points?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Skills</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Work Experience */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-6">
                <Briefcase className="w-5 h-5 mr-2" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                        <p className="text-indigo-600 font-medium text-sm mt-1">{exp.role}</p>
                      </div>
                      {exp.website && (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>
                    <p className="text-gray-700 text-sm mt-3">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            {profile.milestones && profile.milestones.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-6">
                  <Trophy className="w-5 h-5 mr-2" />
                  Career Milestones
                </h2>
                <div className="space-y-6">
                  {profile.milestones.map((milestone, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {getMilestoneIcon(milestone.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(milestone.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </p>
                          <p className="text-gray-700 mt-2">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Points */}
            {profile.key_points && profile.key_points.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-6">
                  <Trophy className="w-5 h-5 mr-2" />
                  Key Expertise
                </h2>
                <div className="space-y-4">
                  {profile.key_points.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {profile.video_url && (
        <VideoPlayer
          videoUrl={profile.video_url}
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
}