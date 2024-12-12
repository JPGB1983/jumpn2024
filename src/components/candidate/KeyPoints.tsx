import React from 'react';
import { Plus, X } from 'lucide-react';

interface KeyPointsProps {
  points: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
}

export default function KeyPoints({
  points,
  onAdd,
  onRemove,
  onUpdate,
}: KeyPointsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Key Expertise
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Add Point
        </button>
      </div>
      <div className="space-y-3">
        {points.map((point, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={point}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., Led digital transformation initiatives"
            />
            {points.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}