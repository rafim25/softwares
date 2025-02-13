'use client';

import React, { useEffect, useState } from 'react';
import { fetchKycDetails } from '@/services/api';

interface KycDetailsProps {
  proposalId: string;
}

const KycDetails = ({ proposalId }: KycDetailsProps) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchKycDetails(proposalId);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load KYC details');
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
        <span className="text-sm text-gray-500">PAN Number</span>
        <p className="font-medium">{details?.panNumber}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Aadhaar Number</span>
        <p className="font-medium">{details?.aadhaarNumber}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Verification Status</span>
        <p className="font-medium">{details?.verificationStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Document Status</span>
        <p className="font-medium">{details?.documentStatus}</p>
      </div>
    </div>
  );
};

export default KycDetails; 