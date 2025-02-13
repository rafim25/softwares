'use client';

import React, { useEffect, useState } from 'react';
import { fetchQuoteDetails } from '@/services/api';

interface QuoteDetailsProps {
  proposalId: string;
}

const QuoteDetails = ({ proposalId }: QuoteDetailsProps) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchQuoteDetails(proposalId);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quote details');
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
        <span className="text-sm text-gray-500">Premium</span>
        <p className="font-medium">{details?.premium}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Frequency</span>
        <p className="font-medium">{details?.frequency}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Term</span>
        <p className="font-medium">{details?.term}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Sum Assured</span>
        <p className="font-medium">{details?.sumAssured}</p>
      </div>
    </div>
  );
};

export default QuoteDetails; 