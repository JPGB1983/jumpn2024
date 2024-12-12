import React from 'react';
import DatePicker from 'react-datepicker';
import { X, Clock } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00'
];

export default function ScheduleCallModal({ isOpen, onClose, candidateName }: ScheduleCallModalProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string>('');

  if (!isOpen) return null;

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      // Here you would typically make an API call to schedule the meeting
      console.log('Scheduling call for:', {
        date: selectedDate,
        time: selectedTime,
        candidate: candidateName
      });
      onClose();
    }
  };

  // Filter out past dates
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Video Call</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">Select a date to meet with {candidateName}</p>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={minDate}
            inline
            calendarClassName="!border-0 !shadow-none"
          />
        </div>

        {selectedDate && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>Available time slots</span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${selectedTime === time
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSchedule}
          disabled={!selectedDate || !selectedTime}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg flex items-center 
                   justify-center gap-2 hover:bg-indigo-700 transition-colors font-medium
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Schedule Call
        </button>
      </div>
    </div>
  );
}