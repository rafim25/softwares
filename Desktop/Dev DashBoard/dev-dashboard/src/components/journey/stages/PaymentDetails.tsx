'use client';

import React, { useEffect, useState } from 'react';
import { fetchPaymentDetails } from '@/services/api';

interface PaymentDetailsProps {
  proposalId: string;
}

const PaymentDetails = ({ proposalId }: PaymentDetailsProps) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchPaymentDetails(proposalId);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load payment details');
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
        <span className="text-sm text-gray-500">Premium Amount</span>
        <p className="font-medium">₹{details?.premiumAmount}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">GST</span>
        <p className="font-medium">₹{details?.gst}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Total Amount</span>
        <p className="font-medium">₹{details?.totalAmount}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Payment Status</span>
        <p className="font-medium">{details?.paymentStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Payment Mode</span>
        <p className="font-medium">{details?.paymentMode}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Transaction ID</span>
        <p className="font-medium">{details?.transactionId}</p>
      </div>
    </div>
  );
};

export default PaymentDetails; 