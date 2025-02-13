'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '@/middleware/LoadingMiddleware';
import SearchBar from '@/components/dashboard/SearchBar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import CustomerJourneyTable from '@/components/dashboard/CustomerJourneyTable';
import JourneyStageCollapse from '@/components/journey/JourneyStageCollapse';
import LeadDetails from '@/components/dashboard/LeadDetails';
import OperationsTimeline from '@/components/dashboard/OperationsTimeline';
import Layout from '@/components/layout/Layout';
import { CustomerJourney } from '@/types/customerJourney';
import { LeadData } from '@/types/lead';
import { OperationEvent } from '@/types/operations';
import { mockCustomerJourneys } from '@/mocks/customerJourneyData';

interface JourneyStage {
  name: string;
  icon: string;
  status: 'completed' | 'inprogress' | 'pending';
  type: 'quote' | 'kyc' | 'payment' | 'customer' | 'health' | 'review';
}

const defaultJourneyStages: JourneyStage[] = [
  {
    name: 'Quote',
    icon: '📋',
    status: 'pending',
    type: 'quote'
  },
  {
    name: 'KYC',
    icon: '🆔',
    status: 'pending',
    type: 'kyc'
  },
  {
    name: 'Payment',
    icon: '💳',
    status: 'pending',
    type: 'payment'
  },
  {
    name: 'Customer Info',
    icon: '👤',
    status: 'pending',
    type: 'customer'
  },
  {
    name: 'Health & Wellness',
    icon: '🏥',
    status: 'pending',
    type: 'health'
  },
  {
    name: 'Review & Submit',
    icon: '✅',
    status: 'pending',
    type: 'review'
  }
];

// Mock operations data
const mockOperations: OperationEvent[] = [
  {
    _operation: 'proposalSubmitted',
    _ts: '1707811437000', // Convert your timestamps to milliseconds
    type: 'appevent.leadsubmission',
    status: 'success',
    attributes: JSON.stringify({ status: 'completed' })
  },
  {
    _operation: 'SubmitApplicationOtpVerifySuccess',
    _ts: '1707811437000',
    type: 'appevent.otp',
    status: 'success',
    attributes: JSON.stringify({ otpVerified: true })
  },
  {
    _operation: 'uploadDocumentSuccess',
    _ts: '1707811437000',
    type: 'appevent.document',
    status: 'success',
    attributes: JSON.stringify({ documentType: 'KYC', status: 'uploaded' })
  },
  {
    _operation: 'paymentCompleted',
    _ts: '1707811437000',
    type: 'appevent.payment',
    status: 'success',
    attributes: JSON.stringify({ amount: 25000, status: 'success' })
  },
  {
    _operation: 'doghCompleted',
    _ts: '1707811437000',
    type: 'appevent.medical',
    status: 'success',
    attributes: JSON.stringify({ status: 'completed' })
  },
  {
    _operation: 'financialDetailsCompleted',
    _ts: '1707811437000',
    type: 'appevent.financial',
    status: 'success',
    attributes: JSON.stringify({ status: 'completed' })
  },
  {
    _operation: 'basicDetailsCompleted',
    _ts: '1707811437000',
    type: 'appevent.basicdetails',
    status: 'success',
    attributes: JSON.stringify({ status: 'completed' })
  }
];

// Mock lead data
const mockLeadData: LeadData = {
  "_id": "c248ba68-cfab-46e2-9943-746dec75ade2",
  "_txId": "c248ba68-cfab-46e2-9943-746dec75ade2",
  "_ts": "1739341835102",
  "_operation": "proposalSubmitted",
  "type": "appevent.leadsubmission",
  "source": "L2I",
  "campaign": "l2i",
  "productUin": "110N162V03",
  "planCode": "SVIPLV1N1",
  "quoteNo": "Q17391828622214",
  "proposalNo": "C269508479",
  "paymentTxId": null,
  "time": "2025-02-12T12:00:35.000Z",
  "_type": "EVENT",
  "topic": "production.event.appevent.leadsubmission",
  "attributes": JSON.stringify({
    "plan": {
      "uin": "110N162V03",
      "code": "SVIPLV1N1",
      "name": "Tata AIA Life Insurance Smart Value Income Plan",
      "type": "Saving",
      "options": {
        "life": "SL",
        "name": "Cash Bonus Single Life and Limited Pay",
        "type": "LP",
        "types": ["Endowment", "NON TERM"],
        "option": "Option 1",
        "wlType": "Non-Whole Life",
        "payType": "LP",
        "planType": "SELF",
        "prodType": "Non POS",
        "shortName": "SVIP",
        "sumAssuredOption": 0
      },
      "planname": "Cash Bonus Single Life and Limited Pay",
      "shortName": "SVIP"
    },
    "agent": {
      "self": {
        "name": "PEDHAMALLU  DHANALAKSHMIDEVI",
        "contacts": [
          { "type": null, "value": null, "channel": "none" },
          { "type": "PRIMARY", "value": "9908237741", "channel": "MOBILE" },
          { "type": "PRIMARY", "value": "PDEVI9908237741@GMAIL.COM", "channel": "EMAIL" },
          { "type": "SECONDARY", "value": null, "channel": "EMAIL" }
        ]
      },
      "branch": "TATA AIA Rajamundry",
      "agentCode": "9373497",
      "licenseNo": "7970007A",
      "branchCode": "RJ01",
      "designation": "SC"
    },
    "quoteNo": "Q17391828622214",
    "campaign": "l2i",
    "customer": false,
    "planCode": "SVIPLV1N1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "productUin": "110N162V03",
    "proposalNo": "C269508479",
    "sumAssured": 1160000,
    "productName": "Tata AIA Life Insurance Smart Value Income Plan",
    "campaignSource": "NA",
    "isMobileJourney": false,
    "productShortName": "SVIP",
    "backendSubmission": true
  }),
  "_wfId": "leadissuance-685826974471496",
  user: {
    name: "appuser",
    role: "appuser",
    source: "l2i"
  }
};

export default function Dashboard() {
  const [leadId, setLeadId] = useState('');
  const [journeys, setJourneys] = useState<CustomerJourney[]>([]);
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>(defaultJourneyStages);
  const [selectedProposalId, setSelectedProposalId] = useState<string>('');
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [operations, setOperations] = useState<OperationEvent[]>([]);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setJourneys(mockCustomerJourneys);
  }, []);

  const updateJourneyStages = (leadData: LeadData) => {
    try {
      const attributes = JSON.parse(leadData.attributes);
      const proposalNo = attributes.proposalNo;
      setSelectedProposalId(proposalNo);

      const updatedStages = defaultJourneyStages.map(stage => {
        let status: 'completed' | 'inprogress' | 'pending' = 'pending';

        if (stage.type === 'quote' && attributes.quoteNo) {
          status = 'completed';
        }

        if (stage.type === 'customer' && attributes.customer !== undefined) {
          status = attributes.customer ? 'completed' : 'inprogress';
        }

        if (stage.type === 'payment' && leadData.paymentTxId) {
          status = 'completed';
        }

        if (stage.type === 'kyc' && attributes.backendSubmission) {
          status = 'completed';
        }

        if (status === 'pending') {
          const previousStageCompleted = journeyStages.findIndex(s => s.type === stage.type) > 0 &&
            journeyStages[journeyStages.findIndex(s => s.type === stage.type) - 1].status === 'completed';
          if (previousStageCompleted) {
            status = 'inprogress';
          }
        }

        return {
          ...stage,
          status
        };
      });

      setJourneyStages(updatedStages);
    } catch (error) {
      console.error('Error parsing lead data:', error);
    }
  };

  const handleSearch = async () => {
    if (!leadId.trim()) {
      setJourneys(mockCustomerJourneys);
      setJourneyStages(defaultJourneyStages);
      setLeadData(null);
      setOperations([]);
      return;
    }

    try {
      setIsLoading(true);
      // Simulating API call with mock data
      const filteredJourneys = mockCustomerJourneys.filter(
        journey => journey.id.toLowerCase().includes(leadId.toLowerCase())
      );
      setJourneys(filteredJourneys);

      // Set mock lead data and operations
      setLeadData(mockLeadData);
      setOperations(mockOperations);
      updateJourneyStages(mockLeadData);
    } catch (error) {
      console.error('Error fetching journey data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6">Customer Journey Dashboard</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={leadId}
            onChange={setLeadId}
            onSearch={handleSearch}
          />
        </div>

        {/* Lead Details */}
        <LeadDetails leadData={leadData} />

        {/* Operations Timeline */}
        {operations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Operations Timeline</h2>
            <OperationsTimeline operations={operations} />
          </div>
        )}

        {/* Journey Stages */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Journey Progress</h2>
          {journeyStages.map((stage) => (
            <JourneyStageCollapse
              key={stage.name}
              stage={stage}
              proposalId={selectedProposalId}
            />
          ))}
        </div>

        <DashboardStats
          totalLeads={journeys.length}
          completedJourneys={journeys.filter(j => j.status === 'completed').length}
          pendingJourneys={journeys.filter(j => j.status === 'pending').length}
        />

        <CustomerJourneyTable journeys={journeys} />
      </div>
    </Layout>
  );
} 