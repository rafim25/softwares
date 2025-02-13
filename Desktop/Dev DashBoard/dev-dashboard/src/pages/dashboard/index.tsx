import React, { useState, useEffect } from 'react';
import { useLoading } from '@/middleware/LoadingMiddleware';
import SearchBar from '@/components/dashboard/SearchBar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import CustomerJourneyTable from '@/components/dashboard/CustomerJourneyTable';
import { CustomerJourney } from '@/types/customerJourney';
import { mockCustomerJourneys } from '@/mocks/customerJourneyData';

const Dashboard: React.FC = () => {
  const [leadId, setLeadId] = useState('');
  const [journeys, setJourneys] = useState<CustomerJourney[]>([]);
  const { setIsLoading } = useLoading();

  // Load all journeys initially
  useEffect(() => {
    setJourneys(mockCustomerJourneys);
  }, []);

  const handleSearch = async () => {
    if (!leadId.trim()) {
      setJourneys(mockCustomerJourneys);
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call with mock data
      const filteredJourneys = mockCustomerJourneys.filter(
        journey => journey.id.toLowerCase().includes(leadId.toLowerCase())
      );
      setJourneys(filteredJourneys);
    } catch (error) {
      console.error('Error fetching journey data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Journey Dashboard</h1>
      <DashboardStats
        totalLeads={journeys.length}
        completedJourneys={journeys.filter(j => j.status === 'completed').length}
        pendingJourneys={journeys.filter(j => j.status === 'pending').length}
      />
      <div className="mb-6">
        <SearchBar
          value={leadId}
          onChange={setLeadId}
          onSearch={handleSearch}
        />
      </div>
      <CustomerJourneyTable journeys={journeys} />
    </div>
  );
};

export default Dashboard; 