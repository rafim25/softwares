import React from 'react';
import { CustomerJourney } from '@/types/customerJourney';

interface CustomerJourneyTableProps {
  journeys: CustomerJourney[];
}

const CustomerJourneyTable: React.FC<CustomerJourneyTableProps> = ({ journeys = [] }) => {
  if (!journeys || journeys.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No journey data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lead ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {journeys.map((journey) => (
            <tr key={journey.id}>
              <td className="px-6 py-4 whitespace-nowrap">{journey.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{journey.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${journey.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {journey.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{journey.source}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${journey.priority === 'High' ? 'bg-red-100 text-red-800' :
                    journey.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}`}>
                  {journey.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(journey.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerJourneyTable; 