import React from 'react';
import { Plus, X } from 'lucide-react';
import type { Milestone } from '../../types/database';

interface MilestonesProps {
  milestones: Partial<Milestone>[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof Milestone, value: any) => void;
}

export default function Milestones({
  milestones,
  onAdd,
  onRemove,
  onUpdate,
}: MilestonesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Career Milestones
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Add Milestone
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium text-gray-900">Milestone {index + 1}</h4>
              {milestones.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => onUpdate(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Forbes 30 Under 30"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Type</label>
                <select
                  value={milestone.type}
                  onChange={(e) => onUpdate(index, 'type', e.target.value as Milestone['type'])}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="achievement">Achievement</option>
                  <option value="award">Award</option>
                  <option value="certification">Certification</option>
                  <option value="publication">Publication</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="month"
                  value={milestone.date}
                  onChange={(e) => onUpdate(index, 'date', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  lang="en"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={milestone.description}
                  onChange={(e) => onUpdate(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe this milestone"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}