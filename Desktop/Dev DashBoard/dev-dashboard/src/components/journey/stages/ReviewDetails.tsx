'use client';

import React, { useEffect, useState } from 'react';
import { fetchReviewDetails } from '@/services/api';

interface ReviewDetailsProps {
  proposalId: string;
}

const ReviewDetails = ({ proposalId }: ReviewDetailsProps) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchReviewDetails(proposalId);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load review details');
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
        <span className="text-sm text-gray-500">Document Verification</span>
        <p className="font-medium">{details?.documentVerification}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">KYC Status</span>
        <p className="font-medium">{details?.kycStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Payment Status</span>
        <p className="font-medium">{details?.paymentStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Medical Status</span>
        <p className="font-medium">{details?.medicalStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Overall Status</span>
        <p className="font-medium">{details?.overallStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Remarks</span>
        <p className="font-medium">{details?.remarks || 'No remarks'}</p>
      </div>
    </div>
  );
};

export default ReviewDetails; 