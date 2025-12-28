import React, { useState } from 'react';
import { Stock } from '../types';
import { HelpCircle, TrendingUp, TrendingDown, Target, BookOpen, Award, CheckCircle } from 'lucide-react';

interface BeginnerViewProps {
  stocks: Stock[];
}

export const BeginnerView: React.FC<BeginnerViewProps> = ({ stocks }) => {
  const [showTip, setShowTip] = useState(true);

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskEmoji = (level?: string) => {
    switch (level) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  const handleAction = (action: string, symbol: string) => {
    alert(`${action} for ${symbol}`);
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
      {/* Beginner Mode Header */}
      <div className="bg-gradient-to-r from-upstox-purple to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen size={24} />
            <div>
              <h2 className="font-bold text-lg">My First Watchlist</h2>
              <p className="text-sm opacity-90">Learn Mode 🎓</p>
            </div>
          </div>
          <button
            className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm font-semibold hover:bg-opacity-30 transition"
            onClick={() => alert('Switching to Pro Mode')}
          >
            Switch to Pro
          </button>
        </div>
      </div>

      {/* Educational Tip */}
      {showTip && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 m-4 rounded-r">
          <div className="flex items-start gap-3">
            <div className="bg-blue-400 text-white rounded-full p-2 flex-shrink-0">
              <HelpCircle size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-1">💡 Quick Tip</h3>
              <p className="text-sm text-blue-800">
                Stocks in <span className="text-green-600 font-semibold">green</span> are going up (gaining value),
                and stocks in <span className="text-red-600 font-semibold">red</span> are going down (losing value).
                Tap any stock to learn more about why prices change!
              </p>
            </div>
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setShowTip(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Stock List */}
      <div className="p-4 space-y-3">
        {stocks.map((stock) => {
          const isPositive = stock.change >= 0;
          const portfolioReturn = stock.inPortfolio && stock.purchasePrice
            ? ((stock.price - stock.purchasePrice) / stock.purchasePrice) * 100
            : 0;

          return (
            <div
              key={stock.symbol}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Stock Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{stock.symbol}</h3>
                      {stock.inPortfolio && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                          ✅ You own this!
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{stock.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Change Indicator - Beginner Friendly */}
                <div className={`${isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-3 mb-3`}>
                  <div className="flex items-center gap-2 mb-1">
                    {isPositive ? (
                      <TrendingUp className="text-green-600" size={20} />
                    ) : (
                      <TrendingDown className="text-red-600" size={20} />
                    )}
                    <span className={`font-bold ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                      {isPositive ? 'Up today' : 'Down today'}
                    </span>
                  </div>
                  <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                    {isPositive ? 'Gained' : 'Lost'} ₹{Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                  </p>
                </div>

                {/* Portfolio Performance - Beginner Friendly */}
                {stock.inPortfolio && (
                  <div className={`${portfolioReturn >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-3 mb-3`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Your Investment</span>
                      <span className={`text-lg font-bold ${portfolioReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {portfolioReturn >= 0 ? '+' : ''}₹{Math.abs(portfolioReturn * stock.purchasePrice! / 100).toFixed(0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      You bought at ₹{stock.purchasePrice} · Your profit: {portfolioReturn >= 0 ? '+' : ''}{portfolioReturn.toFixed(1)}%
                    </p>
                    {stock.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs italic text-gray-600">Your note: "{stock.notes}"</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Why is it moving? */}
                <button
                  className="w-full bg-blue-50 border border-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-100 transition flex items-center justify-between mb-3"
                  onClick={() => handleAction('Why is it moving? See news', stock.symbol)}
                >
                  <span>💡 Why is it moving? Tap to see news</span>
                  <span>→</span>
                </button>

                {/* Risk Level - Beginner Friendly */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Risk Level:</span>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded ${getRiskColor(stock.riskLevel)}`}>
                      <span>{getRiskEmoji(stock.riskLevel)}</span>
                      <span className="font-semibold capitalize">{stock.riskLevel || 'Unknown'}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {stock.riskLevel === 'low' && 'This stock is relatively stable with lower price swings.'}
                    {stock.riskLevel === 'medium' && 'This stock has moderate price movements. Good for learning!'}
                    {stock.riskLevel === 'high' && 'This stock can have big price swings. Be careful!'}
                  </p>
                </div>

                {/* Simple Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className="bg-yellow-100 border border-yellow-300 text-yellow-800 py-2 px-2 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition flex flex-col items-center gap-1"
                    onClick={() => handleAction('Set Alert', stock.symbol)}
                  >
                    <Target size={18} />
                    <span className="text-xs">Set Alert</span>
                  </button>
                  <button
                    className="bg-purple-100 border border-purple-300 text-purple-800 py-2 px-2 rounded-lg text-sm font-semibold hover:bg-purple-200 transition flex flex-col items-center gap-1"
                    onClick={() => handleAction('Learn More', stock.symbol)}
                  >
                    <BookOpen size={18} />
                    <span className="text-xs">Learn More</span>
                  </button>
                  <button
                    className="bg-green-100 border border-green-300 text-green-800 py-2 px-2 rounded-lg text-sm font-semibold hover:bg-green-200 transition flex flex-col items-center gap-1"
                    onClick={() => handleAction('Invest', stock.symbol)}
                  >
                    <span className="text-lg">💰</span>
                    <span className="text-xs">Invest</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Learning Progress Section */}
      <div className="bg-white m-4 rounded-xl shadow-md p-4">
        <div className="flex items-center gap-2 mb-3">
          <Award className="text-yellow-500" size={24} />
          <h3 className="font-bold text-gray-800">Quick Actions</h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">Add 5 more stocks to your watchlist</span>
            </div>
            <span className="text-sm font-bold text-green-600">4/5</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">Set your first price alert</span>
            </div>
            <span className="text-sm font-bold text-gray-400">0/1</span>
          </div>

          <button className="w-full bg-purple-100 border border-purple-300 text-purple-700 py-3 px-4 rounded-lg text-sm font-semibold hover:bg-purple-200 transition flex items-center justify-between">
            <span>📚 Learn: What is a watchlist?</span>
            <span className="text-xs bg-purple-200 px-2 py-1 rounded">2 min read</span>
          </button>
        </div>
      </div>
    </div>
  );
};
