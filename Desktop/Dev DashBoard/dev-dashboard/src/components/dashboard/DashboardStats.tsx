import React from 'react';

interface StatsProps {
  totalLeads?: number;
  completedJourneys?: number;
  pendingJourneys?: number;
}

const DashboardStats: React.FC<StatsProps> = ({
  totalLeads = 0,
  completedJourneys = 0,
  pendingJourneys = 0,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Total Leads</h3>
        <p className="text-2xl font-bold">{totalLeads}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Completed Journeys</h3>
        <p className="text-2xl font-bold">{completedJourneys}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Pending Journeys</h3>
        <p className="text-2xl font-bold">{pendingJourneys}</p>
      </div>
    </div>
  );
};

export default DashboardStats; 