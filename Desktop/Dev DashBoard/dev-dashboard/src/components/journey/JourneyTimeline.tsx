'use client';

import React from 'react';

interface TimelineProps {
  stages: {
    name: string;
    status: 'completed' | 'inprogress' | 'pending';
    icon: string;
  }[];
}

const JourneyTimeline = ({ stages }: TimelineProps) => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.name}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                  stage.status === 'inprogress' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                }`}>
                <span>{stage.icon}</span>
              </div>
              <span className="mt-2 text-xs text-gray-600">{stage.name}</span>
            </div>
            {index < stages.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JourneyTimeline; 