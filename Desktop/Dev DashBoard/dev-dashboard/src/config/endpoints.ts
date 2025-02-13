// Configuration constants
export const GRAFANA_BASE_URL = process.env.REACT_APP_GRAFANA_URL || 'http://localhost:3000';
export const API_ENDPOINTS = {
  grafana: {
    dashboard: `${GRAFANA_BASE_URL}/api/dashboards`,
    metrics: `${GRAFANA_BASE_URL}/api/metrics`,
  }
}; 