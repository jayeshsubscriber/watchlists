import React from 'react';
import { Stock } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface HeatmapViewProps {
  stocks: Stock[];
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({ stocks }) => {
  // Sort stocks by change percentage
  const sortedStocks = [...stocks].sort((a, b) => b.changePercent - a.changePercent);

  const getHeatColor = (changePercent: number): string => {
    if (changePercent >= 5) return 'bg-green-600 text-white';
    if (changePercent >= 2) return 'bg-green-500 text-white';
    if (changePercent >= 0.5) return 'bg-green-400 text-white';
    if (changePercent >= 0) return 'bg-green-200 text-green-900';
    if (changePercent >= -0.5) return 'bg-red-200 text-red-900';
    if (changePercent >= -2) return 'bg-red-400 text-white';
    if (changePercent >= -5) return 'bg-red-500 text-white';
    return 'bg-red-600 text-white';
  };

  const handleStockClick = (symbol: string) => {
    alert(`Quick trade for ${symbol}`);
  };

  return (
    <div className="bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-3 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">Intraday Heatmap</h3>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Top Movers</option>
            <option>Volume Leaders</option>
            <option>% Change</option>
            <option>Gainers First</option>
            <option>Losers First</option>
          </select>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {sortedStocks.map((stock) => {
          const isPositive = stock.change >= 0;
          const vwapDirection = stock.vwap && stock.price > stock.vwap ? '↑' : '↓';

          return (
            <div
              key={stock.symbol}
              className={`${getHeatColor(stock.changePercent)} rounded-lg p-4 cursor-pointer hover:opacity-90 transition transform hover:scale-105 shadow-md`}
              onClick={() => handleStockClick(stock.symbol)}
            >
              {/* Symbol and Icon */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{stock.symbol}</h3>
                {isPositive ? (
                  <TrendingUp size={20} className="opacity-80" />
                ) : (
                  <TrendingDown size={20} className="opacity-80" />
                )}
              </div>

              {/* Change Percentage - Large */}
              <div className="text-3xl font-bold mb-1">
                {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </div>

              {/* Current Price */}
              <div className="text-lg font-semibold mb-3">
                ₹{stock.price.toFixed(2)}
              </div>

              {/* Volume Info */}
              <div className="space-y-1 text-sm opacity-90">
                {stock.volumeRatio && (
                  <div className="flex items-center justify-between">
                    <span>Vol:</span>
                    <span className="font-semibold">
                      {stock.volumeRatio.toFixed(1)}x
                      {stock.volumeRatio > 2 && ' 🔥'}
                    </span>
                  </div>
                )}
                {stock.vwap && (
                  <div className="flex items-center justify-between">
                    <span>VWAP:</span>
                    <span className="font-semibold">{vwapDirection}</span>
                  </div>
                )}
                {stock.dayHigh && stock.dayLow && (
                  <div className="flex items-center justify-between text-xs">
                    <span>Range:</span>
                    <span>{stock.dayLow}-{stock.dayHigh}</span>
                  </div>
                )}
              </div>

              {/* Quick Trade Indicator */}
              <div className="mt-3 pt-3 border-t border-white border-opacity-30 text-xs font-semibold text-center">
                TAP TO TRADE
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h4 className="font-semibold text-sm mb-3 text-gray-700">Color Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-600 rounded"></div>
            <span>+5% or more</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-400 rounded"></div>
            <span>+0.5% to +5%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-400 rounded"></div>
            <span>-0.5% to -5%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded"></div>
            <span>-5% or more</span>
          </div>
        </div>
      </div>
    </div>
  );
};
