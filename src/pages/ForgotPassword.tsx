import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { authService } from '../lib/services';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authService.resetPassword(email);
      if (error) throw error;
      
      setEmailSent(true);
      toast.success('Check your email for the password reset link');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Link to="/" className="p-6 text-indigo-600 hover:text-indigo-700 font-medium">
        <ArrowLeft className="w-5 h-5 inline-block mr-2" />
        Back to home
      </Link>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm w-full max-w-md p-8 border border-gray-100">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {emailSent ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-gray-600 mb-8">
                We've sent password reset instructions to {email}
              </p>
              <Link
                to="/candidate/signin"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Reset Your Password
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Enter your email address and we'll send you instructions to reset your password
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                               focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 
                           transition-colors font-medium disabled:bg-gray-400"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </button>
              </form>

              <p className="mt-6 text-center">
                <span className="text-gray-500">Remember your password? </span>
                <Link
                  to="/candidate/signin"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}