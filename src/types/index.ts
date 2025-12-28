export interface Stock {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  dayHigh?: number;
  dayLow?: number;
  volume?: number;
  avgVolume?: number;
  marketCap?: string;
  pe?: number;
  dividendYield?: number;
  // FnO specific
  hasOptions?: boolean;
  hasFutures?: boolean;
  impliedVolatility?: number;
  openInterestChange?: number;
  putCallRatio?: number;
  // Investment tracking
  inPortfolio?: boolean;
  purchasePrice?: number;
  purchaseDays?: number;
  targetPrice?: number;
  stopLoss?: number;
  notes?: string;
  // Technical indicators
  vwap?: number;
  resistance?: number;
  support?: number;
  volumeRatio?: number; // current volume / avg volume
  // News & Events
  newsCount?: number;
  hasEarnings?: boolean;
  earningsDays?: number;
  // Risk & Volatility
  riskLevel?: 'low' | 'medium' | 'high';
  volatility?: 'low' | 'medium' | 'high';
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface Watchlist {
  id: string;
  name: string;
  description?: string;
  stockCount: number;
  createdBy: string;
  stocks: Stock[];
  indices?: MarketIndex[];
}

export interface ChartDataPoint {
  time: string;
  price: number;
}

export interface OptionData {
  strike: number;
  callPrice: number;
  putPrice: number;
  callOI: number;
  putOI: number;
  callVolume: number;
  putVolume: number;
}

export type ViewMode = 'list' | 'cards' | 'heatmap' | 'fno' | 'beginner';
