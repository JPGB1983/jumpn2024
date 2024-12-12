import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <span 
        className="text-3xl font-bold text-gray-900" 
        style={{ 
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.025em'
        }}
      >
        JumpN
      </span>
    </Link>
  );
}