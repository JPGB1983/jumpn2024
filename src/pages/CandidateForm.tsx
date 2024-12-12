import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import VideoRecorder from '../components/VideoRecorder';
import BasicInfo from '../components/candidate/BasicInfo';
import WorkHistory from '../components/candidate/WorkHistory';
import Milestones from '../components/candidate/Milestones';
import KeyPoints from '../components/candidate/KeyPoints';
import PositionSelector from '../components/PositionSelector';
import CountrySelector from '../components/CountrySelector';
import { storageService } from '../lib/services/storage';
import { databaseService } from '../lib/services/database/database.service';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';
import type { CandidateProfile, WorkExperience, Milestone } from '../types/database';

export default function CandidateForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [points, setPoints] = useState<string[]>(['']);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const [milestones, setMilestones] = useState<Partial<Milestone>[]>([{
    title: '',
    description: '',
    date: '',
    type: 'achievement'
  }]);

  const [workHistory, setWorkHistory] = useState<WorkExperience[]>([{
    id: '',
    candidate_id: '',
    company: '',
    role: '',
    location: '',
    website: '',
    start_date: '',
    end_date: '',
    description: '',
    created_at: ''
  }]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const { data: profile, error } = await databaseService.candidates.getProfile(user.uid);
        if (error) throw error;

        if (profile) {
          const [first, ...rest] = (profile.full_name || '').split(' ');
          setFirstName(first || '');
          setLastName(rest.join(' ') || '');
          setEmail(profile.email || '');
          setRole(profile.role || '');
          setCountry(profile.location || '');
          setLinkedinUrl(profile.linkedin_url || '');
          setPoints(profile.key_points || ['']);
          setMilestones(profile.milestones || [{
            title: '',
            description: '',
            date: '',
            type: 'achievement'
          }]);
          if (profile.profile_image_url) {
            setPreviewImage(profile.profile_image_url);
          }
          if (profile.video_url) {
            setPreviewVideo(profile.video_url);
          }
        }

        const { data: experiences, error: expError } = await databaseService.candidates.getWorkExperience(user.uid);
        if (expError) throw expError;

        if (experiences?.length) {
          setWorkHistory(experiences);
        }
      } catch (error: any) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to save your profile');
      return;
    }

    if (!firstName || !lastName || !email || !role || !country) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      let profileImageUrl = previewImage;
      if (imageFile) {
        const { url, error: uploadError } = await storageService.uploadProfileImage(user.uid, imageFile);
        if (uploadError) throw new Error(uploadError);
        profileImageUrl = url;
      }

      let videoUrl = previewVideo;
      if (videoBlob) {
        const { url, error: videoError } = await storageService.uploadVideo(user.uid, videoBlob);
        if (videoError) throw new Error(videoError);
        videoUrl = url;
      }

      const { error: profileError } = await databaseService.candidates.updateProfile(user.uid, {
        full_name: `${firstName} ${lastName}`.trim(),
        email,
        role,
        location: country,
        linkedin_url: linkedinUrl,
        profile_image_url: profileImageUrl,
        video_url: videoUrl,
        key_points: points.filter(p => p.trim()),
        milestones: milestones.filter(m => m.title && m.description && m.date) as Milestone[],
      });

      if (profileError) throw new Error(profileError);

      for (const work of workHistory) {
        if (!work.company || !work.role) continue;

        const { error: workError } = await databaseService.candidates.addWorkExperience(user.uid, {
          ...work,
          candidate_id: user.uid
        });

        if (workError) throw new Error(workError);
      }

      toast.success('Profile saved successfully');
      navigate('/candidate/dashboard');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSave = (blob: Blob) => {
    setVideoBlob(blob);
    setPreviewVideo(URL.createObjectURL(blob));
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create Your Profile
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form className="p-6 space-y-8" onSubmit={handleSave}>
            <BasicInfo
              firstName={firstName}
              lastName={lastName}
              email={email}
              linkedinUrl={linkedinUrl}
              previewImage={previewImage}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onEmailChange={setEmail}
              onLinkedinUrlChange={setLinkedinUrl}
              onImageChange={setImageFile}
            />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Role *
                </label>
                <PositionSelector
                  selectedPosition={role}
                  onSelect={setRole}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <CountrySelector
                  selectedCountry={country}
                  onSelect={setCountry}
                />
              </div>
            </div>

            <WorkHistory
              workHistory={workHistory}
              onAdd={() => setWorkHistory([...workHistory, {
                id: '',
                candidate_id: '',
                company: '',
                role: '',
                location: '',
                website: '',
                start_date: '',
                end_date: '',
                description: '',
                created_at: ''
              }])}
              onRemove={(index) => setWorkHistory(workHistory.filter((_, i) => i !== index))}
              onUpdate={(index, field, value) => {
                const newWorkHistory = [...workHistory];
                newWorkHistory[index] = {
                  ...newWorkHistory[index],
                  [field]: value
                };
                setWorkHistory(newWorkHistory);
              }}
            />

            <Milestones
              milestones={milestones}
              onAdd={() => setMilestones([...milestones, {
                title: '',
                description: '',
                date: '',
                type: 'achievement'
              }])}
              onRemove={(index) => setMilestones(milestones.filter((_, i) => i !== index))}
              onUpdate={(index, field, value) => {
                const newMilestones = [...milestones];
                newMilestones[index] = {
                  ...newMilestones[index],
                  [field]: value
                };
                setMilestones(newMilestones);
              }}
            />

            <KeyPoints
              points={points}
              onAdd={() => setPoints([...points, ''])}
              onRemove={(index) => setPoints(points.filter((_, i) => i !== index))}
              onUpdate={(index, value) => {
                const newPoints = [...points];
                newPoints[index] = value;
                setPoints(newPoints);
              }}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Video Introduction
              </label>
              <VideoRecorder onVideoSave={handleVideoSave} />
            </div>

            <div className="flex justify-end">
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