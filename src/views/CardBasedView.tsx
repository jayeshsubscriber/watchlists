import React from 'react';
import { Stock } from '../types';
import { MiniChart } from '../components/MiniChart';
import { generateChartData } from '../data/mockData';
import { TrendingUp, Bell, Search } from 'lucide-react';

interface CardBasedViewProps {
  stocks: Stock[];
}

export const CardBasedView: React.FC<CardBasedViewProps> = ({ stocks }) => {
  const handleAction = (action: string, symbol: string) => {
    alert(`${action} for ${symbol}`);
  };

  return (
    <div className="bg-gray-100 p-4 space-y-4">
      {stocks.map((stock) => {
        const isPositive = stock.change >= 0;
        const chartColor = isPositive ? '#00C48C' : '#FF6B6B';
        const chartData = generateChartData(stock.price, stock.volatility === 'high' ? 0.03 : 0.015);
        const portfolioReturn = stock.inPortfolio && stock.purchasePrice
          ? ((stock.price - stock.purchasePrice) / stock.purchasePrice) * 100
          : 0;
        const targetProgress = stock.targetPrice
          ? Math.min((stock.price / stock.targetPrice) * 100, 100)
          : 0;

        return (
          <div
            key={stock.symbol}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">{stock.symbol}</h3>
                <p className="text-sm text-gray-500">{stock.name}</p>
                <span className="text-xs text-gray-400">{stock.exchange}</span>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${isPositive ? 'text-upstox-green' : 'text-upstox-red'}`}>
                  ₹{stock.price.toFixed(2)}
                </div>
                <div className={`text-sm ${isPositive ? 'text-upstox-green' : 'text-upstox-red'}`}>
                  {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="mb-3 bg-gray-50 rounded p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">5-Day Trend</span>
                <TrendingUp size={14} className={isPositive ? 'text-upstox-green' : 'text-upstox-red'} />
              </div>
              <MiniChart data={chartData} color={chartColor} width={260} height={60} />
            </div>

            {/* Target Progress */}
            {stock.targetPrice && (
              <div className="mb-3 bg-green-50 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Target: ₹{stock.targetPrice}</span>
                  <span className="text-sm font-bold text-upstox-green">{targetProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-upstox-green rounded-full transition-all"
                    style={{ width: `${targetProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Portfolio Info */}
            {stock.inPortfolio && stock.purchasePrice && (
              <div className={`mb-3 rounded p-3 ${portfolioReturn >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">In Portfolio</span>
                  <span className={`text-lg font-bold ${portfolioReturn >= 0 ? 'text-upstox-green' : 'text-upstox-red'}`}>
                    {portfolioReturn >= 0 ? '+' : ''}{portfolioReturn.toFixed(2)}% 🎯
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Buy Price: ₹{stock.purchasePrice} ({stock.purchaseDays}d ago)
                </div>
                {stock.notes && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-700 italic">"{stock.notes}"</p>
                  </div>
                )}
              </div>
            )}

            {/* Fundamentals */}
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
              {stock.pe && (
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-gray-500">PE Ratio</div>
                  <div className="font-semibold text-gray-800">{stock.pe}</div>
                </div>
              )}
              {stock.marketCap && (
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-gray-500">Mkt Cap</div>
                  <div className="font-semibold text-gray-800">{stock.marketCap}</div>
                </div>
              )}
              {stock.volumeRatio && (
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-gray-500">Vol</div>
                  <div className={`font-semibold ${stock.volumeRatio > 1.5 ? 'text-orange-600' : 'text-gray-800'}`}>
                    {stock.volumeRatio > 1.5 ? 'High ⚡' : 'Normal'}
                  </div>
                </div>
              )}
            </div>

            {/* News & Events */}
            {(stock.newsCount || stock.hasEarnings) && (
              <div className="mb-3 space-y-1">
                {stock.newsCount && stock.newsCount > 0 && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    📰 <span>News ({stock.newsCount} unread)</span>
                  </div>
                )}
                {stock.hasEarnings && (
                  <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 p-2 rounded">
                    📊 <span>Results in {stock.earningsDays} days</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                className="bg-upstox-green text-white py-2 px-3 rounded text-sm font-semibold hover:bg-green-600 transition"
                onClick={() => handleAction('Quick Buy ₹10K', stock.symbol)}
              >
                Quick Buy
              </button>
              <button
                className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-1"
                onClick={() => handleAction('Set Alert', stock.symbol)}
              >
                <Bell size={14} />
                Alert
              </button>
              <button
                className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-1"
                onClick={() => handleAction('Research', stock.symbol)}
              >
                <Search size={14} />
                Research
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
