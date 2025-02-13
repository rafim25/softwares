export interface GrafanaResponse {
  data: CustomerJourney[];
  total: number;
}

export interface ApiError {
  message: string;
  status: number;
}
