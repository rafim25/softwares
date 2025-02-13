'use client';

import React from 'react';
import { useLoading } from '@/middleware/LoadingMiddleware';

const Header = () => {
  const { isLoading } = useLoading();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Company Logo"
            />
            <span className="ml-3 text-xl font-semibold text-gray-900">
              Customer Journey
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </span>
                <span className="ml-2 text-sm font-medium">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 