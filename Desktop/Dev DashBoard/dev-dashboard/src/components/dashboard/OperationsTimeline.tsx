'use client';

import React, { useMemo, useState } from 'react';
import { OperationEvent, OperationType, getOperationType } from '@/types/operations';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon as SearchIcon,
  DocumentDuplicateIcon,
  FunnelIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface OperationsTimelineProps {
  operations: OperationEvent[];
}

interface FinancialDetail {
  date: string;
  name: string;
  amount: string;
  endDate: string;
  orderId: string;
  bankName: string;
  ifsccode: string;
  accountNo: string;
  frequency: string;
  isDigital: boolean;
  startDate: string;
  branchName: string;
  untilCancelled: string;
  signaturePresent: boolean;
}

interface DocumentDetail {
  documentType?: string;
  status?: string;
  financialDetail?: FinancialDetail;
  [key: string]: any;
}

const OperationIcon: React.FC<{ type: OperationType }> = ({ type }) => {
  const iconMap: Record<OperationType, { icon: string; color: string; description: string }> = {
    SUBMISSION: { icon: '📝', color: 'text-green-500', description: 'Submission events' },
    OTP: { icon: '🔐', color: 'text-blue-500', description: 'OTP verification events' },
    DOCUMENT: { icon: '📄', color: 'text-yellow-500', description: 'Document related events' },
    PAYMENT: { icon: '💳', color: 'text-purple-500', description: 'Payment related events' },
    MEDICAL: { icon: '🏥', color: 'text-red-500', description: 'Medical and health events' },
    FINANCIAL: { icon: '💰', color: 'text-emerald-500', description: 'Financial events' },
    BASIC_DETAILS: { icon: '👤', color: 'text-indigo-500', description: 'Basic details events' },
    SYNC: { icon: '🔄', color: 'text-gray-500', description: 'Synchronization events' },
    OTHER: { icon: '📌', color: 'text-gray-400', description: 'Other events' }
  };

  return (
    <div className="group relative">
      <span className={`text-xl ${iconMap[type].color}`}>
        {iconMap[type].icon}
      </span>
      <div className="absolute left-0 -bottom-1 transform translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {iconMap[type].description}
        </div>
      </div>
    </div>
  );
};

const JsonViewer: React.FC<{ data: any }> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
        className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700 rounded group"
        title="Copy to clipboard"
      >
        <DocumentDuplicateIcon className="w-4 h-4" />
        {copied && (
          <span className="absolute right-0 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
      <pre className="text-xs overflow-x-auto whitespace-pre-wrap bg-gray-50 rounded p-3 mt-2 max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

const DocumentSection: React.FC<{ events: OperationEvent[] }> = ({ events }) => {
  const [expandedDocs, setExpandedDocs] = useState<{ [key: string]: boolean }>({});

  // Filter and sort all document operations
  const documents = useMemo(() => {
    return events
      .filter(event => {
        try {
          // Check for OCR financial success events
          if (event._operation.toLowerCase() === 'ocrfinancialsuccess') {
            return true;
          }
          // Check for other document events
          const attributes = JSON.parse(event.attributes) as DocumentDetail;
          return (
            event._operation.toLowerCase().includes('document') ||
            attributes.documentType
          );
        } catch (error) {
          return false;
        }
      })
      .sort((a, b) => parseInt(b._ts) - parseInt(a._ts))
      .map(event => {
        try {
          // Handle OCR financial success events differently
          if (event._operation.toLowerCase() === 'ocrfinancialsuccess') {
            return {
              event,
              details: {
                documentType: 'Financial Document',
                status: 'success',
                financialDetail: event.financialDetail // Direct access to financialDetail
              },
              timestamp: parseInt(event._ts)
            };
          }

          // Handle other document events
          const attributes = JSON.parse(event.attributes) as DocumentDetail;
          return {
            event,
            details: attributes,
            timestamp: parseInt(event._ts)
          };
        } catch (error) {
          console.error('Error parsing document attributes:', error);
          return null;
        }
      })
      .filter((doc): doc is NonNullable<typeof doc> => doc !== null);
  }, [events]);

  if (documents.length === 0) return null;

  const toggleDoc = (docId: string) => {
    setExpandedDocs(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const formatTimestamp = (ts: number) => {
    return new Date(ts).toLocaleString();
  };

  const getDocumentTitle = (doc: { event: OperationEvent; details: DocumentDetail; timestamp: number }) => {
    if (doc.event._operation.toLowerCase() === 'ocrfinancialsuccess') {
      return 'Financial Document';
    }
    return doc.event._operation;
  };

  const getDocumentStatus = (doc: { event: OperationEvent; details: DocumentDetail; timestamp: number }) => {
    if (doc.event._operation.toLowerCase() === 'ocrfinancialsuccess') {
      return 'success';
    }
    return doc.details.status || 'N/A';
  };

  const renderDocumentDetails = (doc: { event: OperationEvent; details: DocumentDetail; timestamp: number }) => {
    // For OCR financial success events
    if (doc.event._operation.toLowerCase() === 'ocrfinancialsuccess') {
      const financialDetail = doc.event.financialDetail;
      if (!financialDetail) return null;

      return (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Account Holder</span>
            <p className="font-medium">{financialDetail.name}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Amount</span>
            <p className="font-medium">₹{financialDetail.amount}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Bank Name</span>
            <p className="font-medium">{financialDetail.bankName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Account Number</span>
            <p className="font-medium">{financialDetail.accountNo}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">IFSC Code</span>
            <p className="font-medium">{financialDetail.ifsccode}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Start Date</span>
            <p className="font-medium">{financialDetail.startDate}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">End Date</span>
            <p className="font-medium">{financialDetail.endDate}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Order ID</span>
            <p className="font-medium">{financialDetail.orderId}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Frequency</span>
            <p className="font-medium">{financialDetail.frequency}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Branch Name</span>
            <p className="font-medium">{financialDetail.branchName || 'N/A'}</p>
          </div>
          <div className="col-span-2 flex space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Digital:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${financialDetail.isDigital
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                }`}>
                {financialDetail.isDigital ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Signature Present:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${financialDetail.signaturePresent
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}>
                {financialDetail.signaturePresent ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // For other document types
    return (
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-500">Document Type</span>
          <p className="font-medium">{doc.details.documentType || 'N/A'}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status</span>
          <p className="font-medium">{doc.details.status || 'N/A'}</p>
        </div>
        {Object.entries(doc.details)
          .filter(([key]) => !['documentType', 'status', 'financialDetail'].includes(key))
          .map(([key, value]) => (
            <div key={key}>
              <span className="text-sm text-gray-500">{key}</span>
              <p className="font-medium">{typeof value === 'string' ? value : JSON.stringify(value)}</p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">Documents ({documents.length})</h4>
      </div>

      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={`${doc.event._ts}-${index}`}
            className="bg-gray-50 rounded-md p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <DocumentDuplicateIcon className="w-5 h-5 text-blue-500" />
                <div>
                  <h5 className="font-medium text-gray-900">
                    {getDocumentTitle(doc)}
                  </h5>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">
                      {formatTimestamp(doc.timestamp)}
                    </p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getDocumentStatus(doc) === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {getDocumentStatus(doc)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleDoc(`${doc.event._ts}-${index}`)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                {expandedDocs[`${doc.event._ts}-${index}`] ? (
                  <>
                    <ChevronUpIcon className="w-4 h-4 mr-1" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="w-4 h-4 mr-1" />
                    Show Details
                  </>
                )}
              </button>
            </div>

            {expandedDocs[`${doc.event._ts}-${index}`] && renderDocumentDetails(doc)}
          </div>
        ))}
      </div>
    </div>
  );
};

const OperationsTimeline: React.FC<OperationsTimelineProps> = ({ operations }) => {
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
  const [showAllAttributes, setShowAllAttributes] = useState<{ [key: string]: boolean }>({});
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failure'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  // Expand/Collapse all groups
  const toggleAllGroups = () => {
    const newExpandedState = !expandAll;
    setExpandAll(newExpandedState);
    const groups = Object.keys(groupedOperations);
    const newState: { [key: string]: boolean } = {};
    groups.forEach(group => {
      newState[group] = newExpandedState;
    });
    setExpandedGroups(newState);
  };

  const groupedOperations = useMemo(() => {
    const groups: { [key: string]: OperationEvent[] } = {};
    const sortedOperations = [...operations].sort((a, b) => {
      const timeA = parseInt(a._ts);
      const timeB = parseInt(b._ts);
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    sortedOperations.forEach(op => {
      // Apply status filter
      if (filterStatus !== 'all' && op.status !== filterStatus) return;

      // Apply search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          op._operation.toLowerCase().includes(searchLower) ||
          op.type.toLowerCase().includes(searchLower) ||
          op.attributes.toLowerCase().includes(searchLower);
        if (!matchesSearch) return;
      }

      const type = getOperationType(op._operation);
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(op);
    });
    return groups;
  }, [operations, filterStatus, sortOrder, searchQuery]);

  const formatTimestamp = (ts: string) => {
    return new Date(parseInt(ts)).toLocaleString();
  };

  const getRelativeTime = (ts: string) => {
    const diff = Date.now() - parseInt(ts);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  };

  const toggleGroup = (type: string) => {
    setExpandedGroups(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleAttributes = (eventId: string) => {
    setShowAllAttributes(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const getFailureCount = () => {
    return operations.filter(op => op.status === 'failure').length;
  };

  const getTotalEventsCount = () => {
    return Object.values(groupedOperations).reduce((acc, events) => acc + events.length, 0);
  };

  const resetFilters = () => {
    setFilterStatus('all');
    setSearchQuery('');
    setSortOrder('desc');
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col space-y-4">
          {/* Top Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FunnelIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-8 pr-8"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failure">Failure</option>
                </select>
              </div>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ClockIcon className="w-4 h-4 mr-2" />
                {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
              </button>
              <button
                onClick={toggleAllGroups}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowPathIcon className="w-4 h-4 mr-2" />
                {expandAll ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
            {getFailureCount() > 0 && (
              <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full">
                <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{getFailureCount()} Failures Found</span>
              </div>
            )}
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search operations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {(filterStatus !== 'all' || searchQuery || sortOrder !== 'desc') && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <ArrowPathIcon className="w-4 h-4 mr-1" />
                  Reset Filters
                </button>
              )}
              <div className="text-sm text-gray-500">
                Showing {getTotalEventsCount()} events
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {Object.entries(groupedOperations).map(([type, events]) => (
          <div key={type} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleGroup(type)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <OperationIcon type={type as OperationType} />
                <h3 className="text-lg font-semibold ml-2">{type.replace('_', ' ')}</h3>
                <span className="ml-2 text-sm text-gray-500">({events.length})</span>
              </div>
              {expandedGroups[type] ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedGroups[type] && (
              <div className="border-t border-gray-100">
                <div className="divide-y divide-gray-100">
                  {type === 'DOCUMENT' && <DocumentSection events={events} />}
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className={`p-4 ${event.status === 'failure' ? 'bg-red-50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-medium text-gray-900">{event._operation}</p>
                            {event.status && (
                              <span
                                className={`ml-2 text-xs px-2 py-1 rounded-full ${event.status === 'failure' ? 'bg-red-100 text-red-800' :
                                  event.status === 'success' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}
                              >
                                {event.status}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span>{formatTimestamp(event._ts)}</span>
                            <span className="mx-2">•</span>
                            <span>{getRelativeTime(event._ts)}</span>
                          </div>
                        </div>
                      </div>

                      {event.attributes && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleAttributes(`${type}-${index}`)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {showAllAttributes[`${type}-${index}`] ? 'Hide Details' : 'Show Details'}
                          </button>
                          {showAllAttributes[`${type}-${index}`] && (
                            <JsonViewer data={JSON.parse(event.attributes)} />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationsTimeline; 