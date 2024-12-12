import React, { useState } from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, isOpen, onClose }: VideoPlayerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold text-gray-900">Introduction Video</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video">
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-contain bg-black"
            autoPlay
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}