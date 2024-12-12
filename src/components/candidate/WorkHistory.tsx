import React from 'react';
import { Plus, X, Globe } from 'lucide-react';

interface WorkHistoryItem {
  company: string;
  role: string;
  website: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  currentlyWorking: boolean;
}

interface WorkHistoryProps {
  workHistory: WorkHistoryItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof WorkHistoryItem, value: any) => void;
}

export default function WorkHistory({
  workHistory,
  onAdd,
  onRemove,
  onUpdate,
}: WorkHistoryProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Work History
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      <div className="space-y-4">
        {workHistory.map((work, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium text-gray-900">Company {index + 1}</h4>
              {workHistory.length > 1 && (
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
                <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                <input
                  type="text"
                  value={work.company}
                  onChange={(e) => onUpdate(index, 'company', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Tech Corporation"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Role</label>
                <input
                  type="text"
                  value={work.role}
                  onChange={(e) => onUpdate(index, 'role', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Chief Technology Officer"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  value={work.location}
                  onChange={(e) => onUpdate(index, 'location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Company Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={work.website}
                    onChange={(e) => onUpdate(index, 'website', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., https://company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={work.startDate}
                    onChange={(e) => onUpdate(index, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    lang="en"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">End Date</label>
                  <div className="space-y-2">
                    <input
                      type="month"
                      value={work.endDate}
                      onChange={(e) => onUpdate(index, 'endDate', e.target.value)}
                      disabled={work.currentlyWorking}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      lang="en"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`currentlyWorking-${index}`}
                        checked={work.currentlyWorking}
                        onChange={(e) => onUpdate(index, 'currentlyWorking', e.target.checked)}
                      />
                      <label htmlFor={`currentlyWorking-${index}`} className="text-sm text-gray-600">
                        I currently work here
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={work.description}
                  onChange={(e) => onUpdate(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}