'use client';

import React, { useEffect, useState } from 'react';
import { fetchHealthDetails } from '@/services/api';

interface HealthDetailsProps {
  proposalId: string;
}

const HealthDetails = ({ proposalId }: HealthDetailsProps) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchHealthDetails(proposalId);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load health details');
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
        <span className="text-sm text-gray-500">Health Questionnaire</span>
        <p className="font-medium">{details?.questionnaireStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Medical Examination</span>
        <p className="font-medium">{details?.medicalExamStatus}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Height</span>
        <p className="font-medium">{details?.height} cm</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Weight</span>
        <p className="font-medium">{details?.weight} kg</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">BMI</span>
        <p className="font-medium">{details?.bmi}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Medical History</span>
        <p className="font-medium">{details?.medicalHistory || 'None'}</p>
      </div>
    </div>
  );
};

export default HealthDetails; 