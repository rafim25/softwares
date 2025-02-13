import axios from "axios";
import { GrafanaResponse } from "@/types";

const grafanaApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAFANA_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAFANA_API_KEY}`,
  },
});

export const fetchCustomerJourneys = async (
  query: string
): Promise<GrafanaResponse> => {
  const response = await grafanaApi.get<GrafanaResponse>("/api/logs", {
    params: { query },
  });
  return response.data;
};

export const decodeBase64 = (base64String: string): string => {
  try {
    return atob(base64String);
  } catch (error) {
    console.error("Error decoding base64:", error);
    return "Invalid base64 string";
  }
};

export const fetchCustomerDetails = async (proposalId: string) => {
  try {
    const response = await fetch(`/api/proposals/${proposalId}/customer`);
    if (!response.ok) {
      throw new Error("Failed to fetch customer details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};

export const fetchHealthDetails = async (proposalId: string) => {
  try {
    const response = await fetch(`/api/proposals/${proposalId}/health`);
    if (!response.ok) {
      throw new Error("Failed to fetch health details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching health details:", error);
    throw error;
  }
};

export const fetchKycDetails = async (proposalId: string) => {
  try {
    const response = await fetch(`/api/proposals/${proposalId}/kyc`);
    if (!response.ok) {
      throw new Error("Failed to fetch KYC details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching KYC details:", error);
    throw error;
  }
};

export const fetchPaymentDetails = async (proposalId: string) => {
  try {
    const response = await fetch(`/api/proposals/${proposalId}/payment`);
    if (!response.ok) {
      throw new Error("Failed to fetch payment details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error;
  }
};

export const fetchReviewDetails = async (proposalId: string) => {
  try {
    const response = await fetch(`/api/proposals/${proposalId}/review`);
    if (!response.ok) {
      throw new Error("Failed to fetch review details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching review details:", error);
    throw error;
  }
};

export const fetchQuoteDetails = async (quoteId: string) => {
  try {
    const response = await fetch(`/api/quotes/${quoteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quote details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quote details:', error);
    throw error;
  }
};
