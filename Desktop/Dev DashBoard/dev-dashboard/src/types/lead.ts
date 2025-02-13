interface PlanOptions {
  life: string;
  name: string;
  type: string;
  types: string[];
  option: string;
  wlType: string;
  payType: string;
  planType: string;
  prodType: string;
  shortName: string;
  sumAssuredOption: number;
}

interface Plan {
  uin: string;
  code: string;
  name: string;
  type: string;
  options: PlanOptions;
  planname: string;
  shortName: string;
}

interface Contact {
  type: string | null;
  value: string | null;
  channel: string;
}

interface Agent {
  self: {
    name: string;
    contacts: Contact[];
  };
  branch: string;
  agentCode: string;
  licenseNo: string;
  branchCode: string;
  designation: string;
}

interface LeadAttributes {
  plan: Plan;
  agent: Agent;
  quoteNo: string;
  campaign: string;
  customer: boolean;
  planCode: string;
  userAgent: string;
  productUin: string;
  proposalNo: string;
  sumAssured: number;
  productName: string;
  campaignSource: string;
  isMobileJourney: boolean;
  productShortName: string;
  backendSubmission: boolean;
}

export interface LeadData {
  _id: string;
  _txId: string;
  _ts: string;
  _operation: string;
  type: string;
  source: string;
  campaign: string;
  productUin: string;
  planCode: string;
  quoteNo: string;
  proposalNo: string;
  paymentTxId: string | null;
  time: string;
  _type: string;
  topic: string;
  attributes: string;
  _wfId: string;
  user: {
    name: string;
    role: string;
    source: string;
  };
}
