import { Stock, MarketIndex, Watchlist, ChartDataPoint } from '../types';

export const mockIndices: MarketIndex[] = [
  {
    name: 'NIFTY 50',
    value: 26042.30,
    change: -99.80,
    changePercent: -0.38
  },
  {
    name: 'NIFTY BANK',
    value: 59011.35,
    change: -172.25,
    changePercent: -0.29
  }
];

export const mockStocks: Stock[] = [
  {
    symbol: 'GPPL',
    name: 'Gujarat Pipavav Port',
    exchange: 'NSE EQ',
    price: 183.02,
    change: -8.99,
    changePercent: -4.68,
    dayHigh: 192.50,
    dayLow: 181.00,
    volume: 2450000,
    avgVolume: 1200000,
    marketCap: '2.4K Cr',
    pe: 18.5,
    hasOptions: true,
    hasFutures: false,
    targetPrice: 195,
    stopLoss: 175,
    newsCount: 2,
    resistance: 190,
    support: 175,
    volumeRatio: 2.04,
    riskLevel: 'medium',
    volatility: 'high',
    vwap: 185.20
  },
  {
    symbol: 'RCCLTD',
    name: 'REC Limited',
    exchange: 'NSE EQ',
    price: 357.10,
    change: 2.35,
    changePercent: 0.66,
    dayHigh: 360.00,
    dayLow: 352.50,
    volume: 1800000,
    avgVolume: 2000000,
    marketCap: '91.2K Cr',
    pe: 12.3,
    dividendYield: 2.8,
    inPortfolio: true,
    purchasePrice: 318,
    purchaseDays: 15,
    targetPrice: 380,
    notes: 'Strong balance sheet, hold long',
    resistance: 365,
    support: 350,
    volumeRatio: 0.9,
    riskLevel: 'low',
    volatility: 'low',
    vwap: 356.80
  },
  {
    symbol: 'PETRONET',
    name: 'Petronet LNG',
    exchange: 'NSE EQ',
    price: 281.70,
    change: 0.65,
    changePercent: 0.23,
    dayHigh: 284.20,
    dayLow: 279.50,
    volume: 1200000,
    avgVolume: 1000000,
    marketCap: '42.3K Cr',
    pe: 15.8,
    dividendYield: 3.2,
    hasOptions: true,
    hasFutures: true,
    resistance: 285,
    support: 275,
    volumeRatio: 1.2,
    riskLevel: 'low',
    volatility: 'low',
    vwap: 282.10
  },
  {
    symbol: 'TEXRAIL',
    name: 'Texmaco Rail',
    exchange: 'NSE EQ',
    price: 140.09,
    change: 6.00,
    changePercent: 4.47,
    dayHigh: 142.00,
    dayLow: 135.50,
    volume: 3600000,
    avgVolume: 2000000,
    marketCap: '3.2K Cr',
    pe: 22.1,
    resistance: 145,
    support: 135,
    volumeRatio: 1.8,
    riskLevel: 'medium',
    volatility: 'medium',
    vwap: 138.50
  },
  {
    symbol: 'JSWENERGY',
    name: 'JSW Energy',
    exchange: 'NSE EQ',
    price: 479.40,
    change: -4.95,
    changePercent: -1.02,
    dayHigh: 486.00,
    dayLow: 477.20,
    volume: 2800000,
    avgVolume: 2000000,
    marketCap: '77.5K Cr',
    pe: 28.4,
    hasOptions: true,
    hasFutures: true,
    impliedVolatility: 31.2,
    openInterestChange: -8.5,
    putCallRatio: 1.15,
    resistance: 490,
    support: 470,
    volumeRatio: 1.4,
    riskLevel: 'medium',
    volatility: 'medium',
    vwap: 481.30
  },
  {
    symbol: 'RAIN',
    name: 'Rain Industries',
    exchange: 'NSE EQ',
    price: 138.50,
    change: 9.29,
    changePercent: 7.19,
    dayHigh: 140.00,
    dayLow: 131.20,
    volume: 4600000,
    avgVolume: 2000000,
    marketCap: '3.5K Cr',
    pe: 8.9,
    resistance: 142,
    support: 130,
    volumeRatio: 2.3,
    riskLevel: 'high',
    volatility: 'high',
    vwap: 136.80
  },
  {
    symbol: 'EQUITASBNK',
    name: 'Equitas Small Finance Bank',
    exchange: 'NSE EQ',
    price: 61.95,
    change: 0.25,
    changePercent: 0.41,
    dayHigh: 62.50,
    dayLow: 61.20,
    volume: 1400000,
    avgVolume: 2000000,
    marketCap: '4.1K Cr',
    pe: 11.2,
    dividendYield: 1.5,
    resistance: 64,
    support: 60,
    volumeRatio: 0.7,
    riskLevel: 'medium',
    volatility: 'medium',
    vwap: 61.80
  },
  {
    symbol: 'TRIDENT',
    name: 'Trident Limited',
    exchange: 'NSE EQ',
    price: 26.88,
    change: -0.14,
    changePercent: -0.52,
    dayHigh: 27.20,
    dayLow: 26.70,
    volume: 3000000,
    avgVolume: 2000000,
    marketCap: '7.8K Cr',
    pe: 14.6,
    dividendYield: 2.2,
    resistance: 28,
    support: 26,
    volumeRatio: 1.5,
    riskLevel: 'low',
    volatility: 'low',
    vwap: 27.00
  },
  {
    symbol: 'SIEMENS',
    name: 'Siemens Limited',
    exchange: 'NSE EQ',
    price: 3100.90,
    change: 2.90,
    changePercent: 0.09,
    dayHigh: 3125.00,
    dayLow: 3090.50,
    volume: 220000,
    avgVolume: 200000,
    marketCap: '1.1L Cr',
    pe: 68.5,
    dividendYield: 0.8,
    hasOptions: true,
    hasFutures: true,
    resistance: 3150,
    support: 3050,
    volumeRatio: 1.1,
    riskLevel: 'low',
    volatility: 'low',
    vwap: 3105.20,
    hasEarnings: true,
    earningsDays: 5
  }
];

export const mockWatchlist: Watchlist = {
  id: 'wl-001',
  name: 'MACD Bullish Cross',
  description: 'List by You',
  stockCount: 9,
  createdBy: 'You',
  stocks: mockStocks,
  indices: mockIndices
};

// Generate mock chart data for 5-day period
export const generateChartData = (basePrice: number, volatility: number = 0.02): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const days = 5;
  const pointsPerDay = 12; // Every 30 minutes for 6 hours

  let currentPrice = basePrice * 0.98; // Start slightly lower

  for (let day = 0; day < days; day++) {
    for (let point = 0; point < pointsPerDay; point++) {
      const randomChange = (Math.random() - 0.5) * volatility * currentPrice;
      currentPrice += randomChange;

      const hour = 9 + Math.floor(point / 2);
      const minute = (point % 2) * 30;

      data.push({
        time: `${hour}:${minute.toString().padStart(2, '0')}`,
        price: Math.round(currentPrice * 100) / 100
      });
    }
  }

  return data;
};
