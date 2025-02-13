'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Lazy loaded components for each stage
const QuoteDetails = dynamic(() => import('./stages/QuoteDetails'), {
  loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-md"></div>
});
const KycDetails = dynamic(() => import('./stages/KycDetails'), {
  loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-md"></div>
});
const PaymentDetails = dynamic(() => import('./stages/PaymentDetails'), {
  loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-md"></div>
});
const CustomerDetails = dynamic(() => import('./stages/CustomerDetails'), {
  loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-md"></div>
});
const HealthDetails = dynamic(() => import('./stages/HealthDetails'), {
  loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-md"></div>
});
const ReviewDetails = dynamic(() => import('./stages/ReviewDetails'), {
  loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-md"></div>
});

interface JourneyStage {
  name: string;
  icon: string;
  status: 'completed' | 'inprogress' | 'pending';
  type: 'quote' | 'kyc' | 'payment' | 'customer' | 'health' | 'review';
}

interface JourneyStageCollapseProps {
  stage: JourneyStage;
  proposalId: string;
}

const JourneyStageCollapse = ({ stage, proposalId }: JourneyStageCollapseProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  const renderStageContent = () => {
    if (!isLoaded) return null;

    switch (stage.type) {
      case 'quote':
        return <QuoteDetails proposalId={proposalId} />;
      case 'kyc':
        return <KycDetails proposalId={proposalId} />;
      case 'payment':
        return <PaymentDetails proposalId={proposalId} />;
      case 'customer':
        return <CustomerDetails proposalId={proposalId} />;
      case 'health':
        return <HealthDetails proposalId={proposalId} />;
      case 'review':
        return <ReviewDetails proposalId={proposalId} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <button
        onClick={handleExpand}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
      >
        <div className="flex items-center">
          <span className="text-xl mr-3">{stage.icon}</span>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">{stage.name}</h3>
            <span className={`text-sm ${stage.status === 'completed' ? 'text-green-600' :
                stage.status === 'inprogress' ? 'text-blue-600' :
                  'text-gray-500'
              }`}>
              {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
            </span>
          </div>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''
            }`}
        />
      </button>

      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-100">
          {renderStageContent()}
        </div>
      )}
    </div>
  );
};

export default JourneyStageCollapse; 