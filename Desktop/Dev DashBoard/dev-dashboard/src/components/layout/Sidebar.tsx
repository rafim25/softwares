'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const journeyStages = [
  {
    name: 'Dashboard',
    icon: '📊',
    path: '/',
    status: 'active'
  },
  {
    name: 'Quote',
    icon: '📋',
    path: '/quote',
    status: 'completed'
  },
  {
    name: 'KYC',
    icon: '🆔',
    path: '/kyc',
    status: 'inprogress'
  },
  {
    name: 'Payment',
    icon: '💳',
    path: '/payment',
    status: 'pending'
  },
  {
    name: 'Customer Info',
    icon: '👤',
    path: '/customer-info',
    status: 'pending'
  },
  {
    name: 'Health & Wellness',
    icon: '🏥',
    path: '/health',
    status: 'pending'
  },
  {
    name: 'Review & Submit',
    icon: '✅',
    path: '/review',
    status: 'pending'
  }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">Journey Stages</h2>
      </div>
      <nav className="mt-2">
        {journeyStages.map((stage) => (
          <Link
            key={stage.path}
            href={stage.path}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname === stage.path ? 'bg-blue-50 border-r-4 border-blue-500' : ''
              }`}
          >
            <span className="text-xl mr-3">{stage.icon}</span>
            <div>
              <span className="block font-medium">{stage.name}</span>
              {stage.status !== 'active' && (
                <span className={`text-xs ${stage.status === 'completed' ? 'text-green-600' :
                  stage.status === 'inprogress' ? 'text-blue-600' :
                    'text-gray-500'
                  }`}>
                  {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 