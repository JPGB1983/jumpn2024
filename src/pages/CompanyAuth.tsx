import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { Building2 } from 'lucide-react';

export default function CompanyAuth() {
  const location = useLocation();
  const isSignUp = location.pathname.includes('signup');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Link to="/" className="p-6 text-indigo-600 hover:text-indigo-700 font-medium">
        ← Back to home
      </Link>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm w-full max-w-md p-8 border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {isSignUp ? 'Create a Company Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {isSignUp 
              ? 'Start finding exceptional executive talent for your organization'
              : 'Sign in to access your company dashboard'}
          </p>

          <Routes>
            <Route 
              path="/signup" 
              element={<AuthForm type="signup" userType="company" redirectTo="/company/profile" />} 
            />
            <Route 
              path="/signin" 
              element={<AuthForm type="signin" userType="company" redirectTo="/company/dashboard" />} 
            />
          </Routes>

          <p className="mt-6 text-center">
            <span className="text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            </span>
            <Link
              to={isSignUp ? '/company/signin' : '/company/signup'}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}