'use client';

import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface StageDetail {
  label: string;
  value: string | number;
}

interface JourneyStageDetailsProps {
  title: string;
  status: string;
  details: StageDetail[];
  onEdit?: () => void;
}

const JourneyStageDetails = ({ title, status, details, onEdit }: JourneyStageDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full px-4 py-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{title}</h3>
                <span className={`text-sm ${status === 'completed' ? 'text-green-600' :
                    status === 'inprogress' ? 'text-blue-600' :
                      'text-gray-500'
                  }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <ChevronDownIcon
                className={`${open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 py-3 border-t">
                <div className="grid grid-cols-2 gap-4">
                  {details.map((detail, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-gray-500">{detail.label}:</span>
                      <span className="ml-2 font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
                {onEdit && (
                  <button
                    onClick={onEdit}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit Details
                  </button>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default JourneyStageDetails; 