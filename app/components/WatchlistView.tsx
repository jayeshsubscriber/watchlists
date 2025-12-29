'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import StockRow from './StockRow';
import BottomNav from './BottomNav';
import { mockStocks } from '../data/mockData';

interface WatchlistViewProps {
  variant: 'classic' | 'pro' | 'investor' | 'beginner' | 'dark';
}

export default function WatchlistView({ variant }: WatchlistViewProps) {
  const [currentWatchlist, setCurrentWatchlist] = useState('MACD Bullish Cross');
  
  const bgClass = {
    classic: 'bg-gray-50',
    pro: 'bg-slate-900',
    investor: 'bg-gray-100',
    beginner: 'bg-gray-50',
    dark: 'bg-[#0D0D0D]',
  };

  return (
    <div className={`flex flex-col h-full ${bgClass[variant]}`}>
      <Header 
        variant={variant} 
        currentWatchlist={currentWatchlist}
        onWatchlistChange={setCurrentWatchlist}
      />
      
      {/* Stock List */}
      <div className="flex-1 overflow-y-auto">
        {variant === 'investor' || variant === 'beginner' ? (
          // Card layout
          <div className="py-3">
            {mockStocks.map((stock, index) => (
              <StockRow 
                key={stock.symbol} 
                stock={stock} 
                variant={variant}
                index={index}
              />
            ))}
          </div>
        ) : (
          // List layout
          <div className={variant === 'classic' ? 'bg-white' : ''}>
            {mockStocks.map((stock, index) => (
              <StockRow 
                key={stock.symbol} 
                stock={stock} 
                variant={variant}
                index={index}
              />
            ))}
          </div>
        )}
        
        {/* Promo Banner - only for classic */}
        {variant === 'classic' && (
          <div className="mx-4 my-4 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl flex items-center gap-3">
            <div className="text-3xl">📈</div>
            <div>
              <div className="font-semibold text-gray-800">Get <span className="text-purple-600">4X Margin</span> Instantly!</div>
              <div className="text-sm text-gray-600">Trade now with MTF →</div>
            </div>
          </div>
        )}
        
        {/* Related News Section */}
        {variant !== 'pro' && (
          <div className="px-4 py-4 border-t border-gray-100">
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Related News
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-sm font-medium text-gray-800">RAIN Industries surges 7% on strong Q3 results</div>
                <div className="text-xs text-gray-400 mt-1">2 hours ago • Business Standard</div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-sm font-medium text-gray-800">REC Ltd declares ₹4.50 interim dividend</div>
                <div className="text-xs text-gray-400 mt-1">5 hours ago • Moneycontrol</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNav variant={variant} />
    </div>
  );
}
