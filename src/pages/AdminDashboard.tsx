import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Settings, Activity } from 'lucide-react';
import Logo from '../components/Logo';
import SignOut from '../components/SignOut';
import { admin } from '../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    activeJobs: 0,
    totalMatches: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await admin.getSystemStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-6">
              <SignOut />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Companies</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCompanies}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Matches</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalMatches}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 
                     hover:border-indigo-100 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 
                          group-hover:bg-indigo-100 transition-colors">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Manage Users</h3>
            <p className="text-sm text-gray-600">
              View and manage candidate accounts
            </p>
          </Link>

          <Link
            to="/admin/companies"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 
                     hover:border-indigo-100 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 
                          group-hover:bg-indigo-100 transition-colors">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Manage Companies</h3>
            <p className="text-sm text-gray-600">
              View and manage company accounts
            </p>
          </Link>

          <Link
            to="/admin/settings"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 
                     hover:border-indigo-100 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 
                          group-hover:bg-indigo-100 transition-colors">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">System Settings</h3>
            <p className="text-sm text-gray-600">
              Configure platform settings
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}