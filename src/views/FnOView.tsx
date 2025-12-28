import React, { useState } from 'react';
import { Stock } from '../types';
import { TrendingUp, Activity, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';

interface FnOViewProps {
  stocks: Stock[];
}

export const FnOView: React.FC<FnOViewProps> = ({ stocks }) => {
  const [expandedStock, setExpandedStock] = useState<string | null>(null);

  // Filter stocks that have F&O
  const fnoStocks = stocks.filter(stock => stock.hasOptions || stock.hasFutures);

  const handleAction = (action: string, symbol: string) => {
    alert(`${action} for ${symbol}`);
  };

  return (
    <div className="bg-white">
      {/* F&O Header */}
      <div className="bg-upstox-purple text-white p-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={20} />
            <span className="font-semibold">F&O Mode</span>
            <span className="bg-yellow-400 text-purple-900 text-xs px-2 py-0.5 rounded font-bold">ON ⚡</span>
          </div>
          <div className="text-sm">
            <span className="opacity-90">Expiry: </span>
            <span className="font-bold">28 Dec (Today)</span>
            <span className="mx-2">·</span>
            <span className="opacity-90">PCR: </span>
            <span className="font-bold">1.23</span>
          </div>
        </div>
      </div>

      {/* F&O Stocks List */}
      <div>
        {fnoStocks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Activity size={48} className="mx-auto mb-3 opacity-50" />
            <p>No F&O stocks in your watchlist</p>
            <p className="text-sm mt-1">Add stocks with Options or Futures to see F&O data</p>
          </div>
        ) : (
          fnoStocks.map((stock) => {
            const isPositive = stock.change >= 0;
            const expanded = expandedStock === stock.symbol;
            const atmStrike = Math.round(stock.price / 5) * 5; // Round to nearest 5

            return (
              <div
                key={stock.symbol}
                className="border-b border-gray-200"
              >
                <div className="p-4">
                  {/* Stock Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{stock.symbol}</h3>
                        <div className="flex gap-1">
                          {stock.hasFutures && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">
                              FUT
                            </span>
                          )}
                          {stock.hasOptions && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-semibold">
                              OPT
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{stock.exchange}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${isPositive ? 'text-upstox-green' : 'text-upstox-red'}`}>
                        ₹{stock.price.toFixed(2)}
                      </div>
                      <div className={`text-sm ${isPositive ? 'text-upstox-green' : 'text-upstox-red'}`}>
                        {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>

                  {/* F&O Metrics */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      {stock.impliedVolatility && (
                        <div>
                          <div className="text-gray-500 text-xs mb-1">IV (Implied Volatility)</div>
                          <div className="font-bold text-purple-700 flex items-center gap-1">
                            {stock.impliedVolatility}%
                            <TrendingUp size={14} />
                          </div>
                        </div>
                      )}
                      {stock.openInterestChange !== undefined && (
                        <div>
                          <div className="text-gray-500 text-xs mb-1">OI Change</div>
                          <div className={`font-bold ${stock.openInterestChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.openInterestChange >= 0 ? '+' : ''}{stock.openInterestChange}%
                          </div>
                        </div>
                      )}
                      {stock.putCallRatio && (
                        <div>
                          <div className="text-gray-500 text-xs mb-1">PCR</div>
                          <div className="font-bold text-blue-700">
                            {stock.putCallRatio}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Support & Resistance */}
                    {stock.resistance && stock.support && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-red-600 font-semibold">Support: ₹{stock.support}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-green-600 font-semibold">Resistance: ₹{stock.resistance}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ATM Options Quick View */}
                  {stock.hasOptions && (
                    <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-lg p-3 mb-3">
                      <div className="text-xs text-gray-600 mb-2 font-semibold">ATM Strike: {atmStrike}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-green-100 rounded p-2">
                          <div className="text-xs text-green-700 mb-1">CALL</div>
                          <div className="text-lg font-bold text-green-800">₹8.20</div>
                          <div className="text-xs text-green-600">+2.3%</div>
                        </div>
                        <div className="bg-red-100 rounded p-2">
                          <div className="text-xs text-red-700 mb-1">PUT</div>
                          <div className="text-lg font-bold text-red-800">₹6.50</div>
                          <div className="text-xs text-red-600">-1.8%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      className="bg-green-600 text-white py-2 px-3 rounded font-semibold hover:bg-green-700 transition"
                      onClick={() => handleAction('BUY CALL', stock.symbol)}
                    >
                      BUY CALL
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 px-3 rounded font-semibold hover:bg-red-700 transition"
                      onClick={() => handleAction('BUY PUT', stock.symbol)}
                    >
                      BUY PUT
                    </button>
                  </div>

                  {/* More Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className="bg-gray-100 text-gray-700 py-2 px-2 rounded text-sm font-semibold hover:bg-gray-200 transition"
                      onClick={() => handleAction('Option Chain', stock.symbol)}
                    >
                      Option Chain
                    </button>
                    <button
                      className="bg-gray-100 text-gray-700 py-2 px-2 rounded text-sm font-semibold hover:bg-gray-200 transition"
                      onClick={() => handleAction('Greeks', stock.symbol)}
                    >
                      Greeks
                    </button>
                    <button
                      className="bg-gray-100 text-gray-700 py-2 px-2 rounded text-sm font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-1"
                      onClick={() => setExpandedStock(expanded ? null : stock.symbol)}
                    >
                      Strategy
                      {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  {/* Expanded Strategy Builder */}
                  {expanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <BarChart2 size={16} />
                        Popular Strategies
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="bg-blue-50 border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm font-semibold hover:bg-blue-100 transition">
                          Long Straddle
                        </button>
                        <button className="bg-blue-50 border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm font-semibold hover:bg-blue-100 transition">
                          Iron Condor
                        </button>
                        <button className="bg-blue-50 border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm font-semibold hover:bg-blue-100 transition">
                          Bull Call Spread
                        </button>
                        <button className="bg-blue-50 border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm font-semibold hover:bg-blue-100 transition">
                          Bear Put Spread
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Position Alert (Example) */}
                {stock.symbol === 'JSWENERGY' && (
                  <div className="bg-orange-50 border-t border-orange-200 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-orange-600" />
                        <span className="text-sm font-semibold text-orange-800">
                          Active Position: 480 CE
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-red-600">P&L: -₹2,450</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-orange-600 text-white py-1 px-3 rounded text-xs font-semibold">
                        Square Off
                      </button>
                      <button className="flex-1 bg-orange-100 text-orange-700 py-1 px-3 rounded text-xs font-semibold">
                        Add Hedge
                      </button>
                      <button className="flex-1 bg-orange-100 text-orange-700 py-1 px-3 rounded text-xs font-semibold">
                        Roll Over
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
