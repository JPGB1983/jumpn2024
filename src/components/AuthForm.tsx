import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';

interface AuthFormProps {
  type: 'signin' | 'signup';
  userType: 'candidate' | 'company';
  redirectTo: string;
}

export default function AuthForm({ type, userType, redirectTo }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const validateForm = () => {
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return false;
    }
    if (type === 'signup' && !name) {
      toast.error('Name is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginAttempts(prev => prev + 1);

    try {
      if (type === 'signup') {
        const { error } = await signUp(email, password);
        if (error) throw error;
        navigate(redirectTo);
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          throw error;
        }
        navigate(redirectTo);
      }
    } catch (error: any) {
      toast.error(error.message);
      
      if (loginAttempts >= 1 && type === 'signin') {
        toast.error(
          <div>
            Having trouble? <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700">Reset your password</Link>
          </div>
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {userType === 'company' ? 'Company Name' : 'Full Name'}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                     focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                     focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                     focus:ring-indigo-500 focus:border-transparent pr-10"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 
                 transition-colors font-medium disabled:bg-gray-400"
      >
        {isLoading ? 'Please wait...' : type === 'signup' ? 'Create Account' : 'Sign In'}
      </button>

      {type === 'signin' && loginAttempts >= 2 && (
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700 text-sm">
            Forgot your password?
          </Link>
        </div>
      )}
    </form>
  );
}