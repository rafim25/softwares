'use client';

import React, { useEffect, useState } from 'react';
import { fetchCustomerDetails } from '@/services/api';

interface CustomerDetailsProps {
  proposalId: string;
}

const CustomerDetails = ({ proposalId }: CustomerDetailsProps) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchCustomerDetails(proposalId);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customer details');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [proposalId]);

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-md"></div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="text-sm text-gray-500">Name</span>
        <p className="font-medium">{details?.name}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Date of Birth</span>
        <p className="font-medium">{details?.dob}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Occupation</span>
        <p className="font-medium">{details?.occupation}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Contact</span>
        <p className="font-medium">{details?.contact}</p>
      </div>
    </div>
  );
};

export default CustomerDetails; 