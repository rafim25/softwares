'use client';

import React from 'react';
import { LeadData } from '@/types/lead';

interface LeadDetailsProps {
  leadData: LeadData | null;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ leadData }) => {
  if (!leadData) return null;

  const attributes = JSON.parse(leadData.attributes);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Workflow ID Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Workflow ID: <span className="font-mono font-medium">{leadData._wfId}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Quote No</p>
              <p className="font-medium">{attributes.quoteNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Proposal No</p>
              <p className="font-medium">{attributes.proposalNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Sum Assured</p>
              <p className="font-medium">{formatCurrency(attributes.sumAssured)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">{formatDate(leadData.time)}</p>
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Plan Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Plan Name</p>
              <p className="font-medium">{attributes.plan.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Plan Type</p>
              <p className="font-medium">{attributes.plan.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Type</p>
              <p className="font-medium">{attributes.plan.options.payType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Product Type</p>
              <p className="font-medium">{attributes.plan.options.prodType}</p>
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Agent Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Agent Name</p>
              <p className="font-medium">{attributes.agent.self.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Agent Code</p>
              <p className="font-medium">{attributes.agent.agentCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Branch</p>
              <p className="font-medium">{attributes.agent.branch}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">License No</p>
              <p className="font-medium">{attributes.agent.licenseNo}</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
          <div className="space-y-2">
            {attributes.agent.self.contacts.map((contact: any, index: number) => (
              contact.value && (
                <div key={index} className="flex items-center">
                  <span className="text-sm text-gray-500 w-20">{contact.channel}:</span>
                  <span className="font-medium">{contact.value}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails; 