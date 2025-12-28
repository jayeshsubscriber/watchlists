import React, { useState } from 'react';
import { Stock } from '../types';
import { MiniChart } from '../components/MiniChart';
import { generateChartData } from '../data/mockData';
import { Zap, DollarSign, BarChart3, Newspaper } from 'lucide-react';

interface EnhancedDefaultViewProps {
  stocks: Stock[];
}

export const EnhancedDefaultView: React.FC<EnhancedDefaultViewProps> = ({ stocks }) => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const handleQuickAction = (action: string, symbol: string) => {
    alert(`${action} action for ${symbol}`);
  };

  return (
    <div className="bg-white">
      {stocks.map((stock, index) => {
        const isPositive = stock.change >= 0;
        const chartColor = isPositive ? '#00C48C' : '#FF6B6B';
        const chartData = generateChartData(stock.price, stock.volatility === 'high' ? 0.03 : 0.015);
        const expanded = selectedStock === stock.symbol;

        return (
          <div
            key={stock.symbol}
            className={`border-b border-gray-200 ${index === 0 ? 'border-t' : ''}`}
          >
            <div
              className="p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedStock(expanded ? null : stock.symbol)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">{stock.symbol}</h3>
                    {stock.volatility === 'high' && (
                      <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                        <Zap size={12} />
                        High Vol
                      </span>
                    )}
                    {stock.inPortfolio && (
                      <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                        <DollarSign size={12} />
                        In Portfolio
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>{stock.exchange}</span>
                    {stock.resistance && stock.price >= stock.resistance * 0.98 && (
                      <span className="flex items-center gap-1 text-purple-600">
                        <BarChart3 size={10} />
                        Near Resistance
                      </span>
                    )}
                    {stock.dividendYield && (
                      <span className="text-green-600">
                        💰 Div Yield {stock.dividendYield}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block">
                    <MiniChart data={chartData} color={chartColor} />
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${isPositive ? 'text-upstox-green' : 'text-upstox-red'}`}>
                      {stock.price.toFixed(2)}
                    </div>
                    <div className={`text-sm ${isPositive ? 'text-upstox-green' : 'text-upstox-red'}`}>
                      {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Target and Alert indicators */}
              <div className="flex items-center gap-2 text-xs mb-2">
                {stock.targetPrice && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <span>Target: ₹{stock.targetPrice}</span>
                    <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-upstox-green rounded-full"
                        style={{ width: `${Math.min((stock.price / stock.targetPrice) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-upstox-green">
                      {((stock.price / stock.targetPrice) * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
                {stock.inPortfolio && stock.purchasePrice && (
                  <span className={`${stock.price > stock.purchasePrice ? 'text-upstox-green' : 'text-upstox-red'}`}>
                    In Portfolio: {stock.price > stock.purchasePrice ? '+' : ''}{(((stock.price - stock.purchasePrice) / stock.purchasePrice) * 100).toFixed(1)}%
                  </span>
                )}
                {stock.newsCount && stock.newsCount > 0 && (
                  <span className="flex items-center gap-1 text-blue-600">
                    <Newspaper size={12} />
                    News · {stock.newsCount}
                  </span>
                )}
              </div>

              {/* Quick action buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-upstox-green text-white py-2 px-3 rounded text-sm font-semibold hover:bg-green-600 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAction('BUY', stock.symbol);
                  }}
                >
                  BUY
                </button>
                <button
                  className="flex-1 bg-upstox-red text-white py-2 px-3 rounded text-sm font-semibold hover:bg-red-600 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAction('SELL', stock.symbol);
                  }}
                >
                  SELL
                </button>
                {stock.hasOptions && (
                  <button
                    className="flex-1 bg-upstox-purple text-white py-2 px-3 rounded text-sm font-semibold hover:bg-purple-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAction('OPTIONS', stock.symbol);
                    }}
                  >
                    OPTIONS
                  </button>
                )}
                <button
                  className="px-3 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAction('ANALYSIS', stock.symbol);
                  }}
                >
                  📊
                </button>
              </div>

              {/* Expanded details */}
              {expanded && (
                <div className="mt-3 pt-3 border-t border-gray-200 text-sm space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-gray-500">Day Range:</span>
                      <span className="ml-2 font-semibold">₹{stock.dayLow} - ₹{stock.dayHigh}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Volume:</span>
                      <span className="ml-2 font-semibold">{(stock.volume! / 1000000).toFixed(2)}M</span>
                      {stock.volumeRatio && stock.volumeRatio > 1.5 && (
                        <span className="ml-1 text-orange-600">({stock.volumeRatio.toFixed(1)}x avg)</span>
                      )}
                    </div>
                    {stock.pe && (
                      <div>
                        <span className="text-gray-500">P/E:</span>
                        <span className="ml-2 font-semibold">{stock.pe}</span>
                      </div>
                    )}
                    {stock.marketCap && (
                      <div>
                        <span className="text-gray-500">Market Cap:</span>
                        <span className="ml-2 font-semibold">{stock.marketCap}</span>
                      </div>
                    )}
                  </div>
                  {stock.notes && (
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-gray-600">📝 Note:</span>
                      <span className="ml-2 text-gray-800">{stock.notes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
