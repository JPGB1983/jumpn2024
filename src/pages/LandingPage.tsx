import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Shield, Globe2, Sparkles, Linkedin, Mail, Check } from 'lucide-react';

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connect with Top Executive Talent
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            JumpN connects organizations with experienced C-level executives ready to make an impact
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Profiles</h3>
              <p className="text-gray-600 text-center">
                Thoroughly vetted executives
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Globe2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600 text-center">
                Access worldwide talent
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Matching</h3>
              <p className="text-gray-600 text-center">
                AI-powered recommendations
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* For Candidates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="w-48 h-48 mx-auto mt-8 mb-4 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Executive"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">For Candidates</h2>
                <p className="text-gray-600 mb-6">
                  Showcase your executive experience and connect with leading organizations
                </p>
                <Link
                  to="/candidate/signup"
                  className="block w-full py-3 px-4 bg-gray-900 text-white rounded-lg 
                           hover:bg-gray-800 transition-colors font-medium"
                >
                  Join as an Executive
                </Link>
                <div className="mt-4">
                  <span className="text-gray-500">Already have an account? </span>
                  <Link
                    to="/candidate/signin"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>

            {/* For Companies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="w-48 h-48 mx-auto mt-8 mb-4 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Modern office building"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">For Companies</h2>
                <p className="text-gray-600 mb-6">
                  Find and connect with experienced C-level executives for your organization
                </p>
                <Link
                  to="/company/signup"
                  className="block w-full py-3 px-4 bg-gray-900 text-white rounded-lg 
                           hover:bg-gray-800 transition-colors font-medium"
                >
                  Start Hiring
                </Link>
                <div className="mt-4">
                  <span className="text-gray-500">Already have an account? </span>
                  <Link
                    to="/company/signin"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Choose the plan that best fits your organization's hiring needs
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">Perfect for getting started</p>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Up to 5 active searches
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Basic candidate filtering
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Email support
                    </li>
                  </ul>
                </div>
                <Link
                  to="/company/signup"
                  className="mt-8 block w-full py-3 px-4 bg-indigo-600 text-white rounded-lg 
                         hover:bg-indigo-700 transition-colors text-center font-medium"
                >
                  Get Started
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-200 flex flex-col relative">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Popular
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$299</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">For growing organizations</p>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Unlimited searches
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Advanced filtering
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Custom company page
                    </li>
                  </ul>
                </div>
                <Link
                  to="/company/signup"
                  className="mt-8 block w-full py-3 px-4 bg-indigo-600 text-white rounded-lg 
                         hover:bg-indigo-700 transition-colors text-center font-medium"
                >
                  Get Started
                </Link>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-xl font-bold">Custom pricing</span>
                  </div>
                  <p className="text-gray-600 mb-6">For large organizations</p>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Unlimited everything
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      Custom integration
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      24/7 phone support
                    </li>
                  </ul>
                </div>
                <Link
                  to="/company/signup"
                  className="mt-8 block w-full py-3 px-4 bg-indigo-600 text-white rounded-lg 
                         hover:bg-indigo-700 transition-colors text-center font-medium"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              What Our Users Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-600 mb-4">
                  "JumpN helped me find the perfect executive role at a fast-growing tech company. The platform's focus on quality over quantity made all the difference."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-600">CTO at TechCorp</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-600 mb-4">
                  "As a growing company, finding the right executive talent was crucial. JumpN's platform made it easy to connect with pre-vetted candidates."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Anderson</p>
                    <p className="text-sm text-gray-600">CEO at Innovate Inc</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-600 mb-4">
                  "The quality of candidates on JumpN is exceptional. We've made multiple C-level hires through the platform, all of whom have been great fits."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">David Wilson</p>
                    <p className="text-sm text-gray-600">Founder at GrowthCo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-100 mt-12 py-8">
            <div className="flex justify-center items-center gap-4">
              <a 
                href="https://linkedin.com/company/jumpn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@gojumpn.com" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              © {currentYear} JumpN. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}