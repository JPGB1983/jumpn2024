import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SignOut from '../components/SignOut';
import PositionSelector from '../components/PositionSelector';
import CountrySelector from '../components/CountrySelector';
import CandidateCard from '../components/CandidateCard';
import CandidateDetail from '../components/CandidateDetail';
import { Search } from 'lucide-react';
import { searchService } from '../lib/services/search/search.service';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';
import type { CandidateProfile } from '../types/database';

export default function SearchPage() {
  const { user } = useAuth();
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!selectedPosition && !selectedCountry) {
      toast.error('Please select at least one search criteria');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchService.searchCandidates({
        position: selectedPosition,
        country: selectedCountry
      });
      
      setCandidates(results);
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Failed to search candidates');
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedCandidate) {
    const candidate = candidates.find(c => c.id === selectedCandidate);
    if (candidate) {
      return (
        <CandidateDetail
          candidate={candidate}
          onBack={() => setSelectedCandidate(null)}
          selectedCountry={selectedCountry}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-6">
            <Link to="/company/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <SignOut />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Search Executive Talent</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 items-end">
            <PositionSelector
              selectedPosition={selectedPosition}
              onSelect={setSelectedPosition}
            />
            <CountrySelector
              selectedCountry={selectedCountry}
              onSelect={setSelectedCountry}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="h-[42px] px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                       transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              <Search className="w-5 h-5" />
              {isLoading ? 'Searching...' : 'Search Candidates'}
            </button>
          </div>
        </div>

        {hasSearched && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-gray-600">
                No candidates found. Try adjusting your search criteria.
              </div>
            ) : (
              candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onClick={() => setSelectedCandidate(candidate.id)}
                  selectedCountry={selectedCountry}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}