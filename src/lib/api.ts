import axios from "axios";

// API base configuration
const api = axios.create({
  baseURL: "http://localhost:8000", // Your FastAPI backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Types matching your FastAPI schemas
export interface Trade {
  id: number;
  symbol: string;
  side: "long" | "short";
  size: string;
  price: string;
  status: "pending" | "filled" | "cancelled";
  leverage: number;
  created_at: string;
  updated_at: string | null;
}

export interface CreateTradeRequest {
  symbol: string;
  side: "long" | "short";
  size: string;
  price: string;
  leverage: number;
}

export interface MarginSimulation {
  symbol: string;
  side: "long" | "short";
  size: string;
  price: string;
  leverage: number;
}

export interface MarginResponse {
  required_margin: string;
  maintenance_margin: string;
  liquidation_price: string;
  max_loss: string;
}

// API functions
export const tradingApi = {
  // Health check
  healthCheck: () => api.get("/health"),

  // Create new trade
  createTrade: (trade: CreateTradeRequest) =>
    api.post<Trade>("/trades/", trade),

  // Get trade by ID
  getTrade: (id: number) => api.get<Trade>(`/trades/${id}`),

  // Get recent trades
  getRecentTrades: (limit: number = 20) =>
    api.get<Trade[]>(`/trades/recent?limit=${limit}`),

  // Simulate margin requirements
  simulateMargin: (simulation: MarginSimulation) =>
    api.post<MarginResponse>("/trades/simulate-margin", simulation),
};
