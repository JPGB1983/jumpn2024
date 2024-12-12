import React, { useState } from 'react';
import { ArrowLeft, Calendar, Play, Trophy, Building2, MapPin, Globe, Linkedin } from 'lucide-react';
import ScheduleCallModal from './ScheduleCallModal';
import VideoPlayer from './VideoPlayer';
import { getCountryName } from '../lib/utils/countries';
import type { CandidateProfile } from '../types/database';

interface CandidateDetailProps {
  candidate: CandidateProfile;
  onBack: () => void;
  selectedCountry: string;
}

export default function CandidateDetail({ candidate, onBack }: CandidateDetailProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-green-600" />;
      case 'award':
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      case 'certification':
        return <Trophy className="w-5 h-5 text-blue-600" />;
      case 'publication':
        return <Trophy className="w-5 h-5 text-purple-600" />;
      default:
        return <Trophy className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to search
      </button>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Profile Section */}
        <div>
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden ring-8 ring-indigo-50">
              {candidate.profile_image_url ? (
                <img
                  src={candidate.profile_image_url}
                  alt={candidate.full_name}
                  className="w-full h-full object-cover"
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
          
          <div className="mt-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {candidate.full_name}
            </h1>
            <p className="text-xl text-indigo-600 mb-2">{candidate.role?.toUpperCase()}</p>
            <div className="flex items-center justify-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {getCountryName(candidate.location)}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              {candidate.linkedin_url && (
                <a
                  href={candidate.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:opacity-80 transition-opacity"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Video and Call Section */}
        <div className="space-y-6">
          {candidate.video_url && (
            <div 
              onClick={() => setShowVideo(true)}
              className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center
                            group-hover:bg-opacity-50 transition-all duration-200">
                <Play className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          )}

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg flex items-center 
                     justify-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Schedule Video Call
          </button>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-6">
            <Building2 className="w-5 h-5 mr-2" />
            Work Experience
          </h2>
          <div className="space-y-6">
            {candidate.work_experience?.map((exp, index) => (
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
        </section>

        {/* Key Points and Milestones Section */}
        <div className="space-y-8">
          {/* Key Points */}
          {candidate.key_points && candidate.key_points.length > 0 && (
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-6">
                <Trophy className="w-5 h-5 mr-2" />
                Key Expertise
              </h2>
              <div className="space-y-4">
                {candidate.key_points.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-2 h-2 mt-2 rounded-full bg-indigo-600 mr-3" />
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Milestones */}
          {candidate.milestones && candidate.milestones.length > 0 && (
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-6">
                <Trophy className="w-5 h-5 mr-2" />
                Career Milestones
              </h2>
              <div className="space-y-4">
                {candidate.milestones.map((milestone, index) => (
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
            </section>
          )}
        </div>
      </div>

      {/* Modals */}
      {isScheduleModalOpen && (
        <ScheduleCallModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          candidateName={candidate.full_name}
        />
      )}

      {showVideo && candidate.video_url && (
        <VideoPlayer
          videoUrl={candidate.video_url}
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
}