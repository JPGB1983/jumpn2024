import React, { useRef, useState, useEffect } from 'react';
import { Video, StopCircle, Play, RotateCcw, Upload } from 'lucide-react';

interface VideoRecorderProps {
  onVideoSave: (videoBlob: Blob) => void;
  maxDuration?: number; // in seconds
}

export default function VideoRecorder({ onVideoSave, maxDuration = 120 }: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        onVideoSave(blob);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimeLeft(maxDuration);
      setError('');
    } catch (err) {
      setError('Could not access camera. Please ensure you have granted permission.');
      console.error('Error accessing media devices:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedVideo(null);
    setTimeLeft(maxDuration);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="aspect-video mb-4 bg-black rounded-lg overflow-hidden relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`w-full h-full ${recordedVideo ? 'hidden' : ''}`}
        />
        {recordedVideo && (
          <video
            src={recordedVideo}
            controls
            className="w-full h-full"
          />
        )}
        {isRecording && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full 
                         flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}

      <div className="flex justify-center gap-4">
        {!isRecording && !recordedVideo && (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 transition-colors"
          >
            <Video className="w-5 h-5" />
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg
                     hover:bg-red-700 transition-colors"
          >
            <StopCircle className="w-5 h-5" />
            Stop Recording
          </button>
        )}

        {recordedVideo && (
          <button
            onClick={resetRecording}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg
                     hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Record Again
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        Record a 2-minute introduction video to showcase your expertise
      </p>
    </div>
  );
}