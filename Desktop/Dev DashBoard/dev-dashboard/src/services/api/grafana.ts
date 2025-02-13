import axios from "axios";
import { GrafanaResponse } from "@/types/api";
import { API_ENDPOINTS } from "@/config/constants";

const grafanaApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAFANA_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAFANA_API_KEY}`,
  },
});

export const grafanaService = {
  fetchCustomerJourneys: async (query: string): Promise<GrafanaResponse> => {
    const response = await grafanaApi.get<GrafanaResponse>(
      API_ENDPOINTS.GRAFANA.LOGS,
      {
        params: { query },
      }
    );
    return response.data;
  },

  decodeBase64: (base64String: string): string => {
    try {
      return atob(base64String);
    } catch (error) {
      console.error("Error decoding base64:", error);
      return "Invalid base64 string";
    }
  },
};
