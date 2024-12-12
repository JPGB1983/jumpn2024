import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function SignOut() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <button 
      onClick={handleSignOut}
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      Sign Out
    </button>
  );
}