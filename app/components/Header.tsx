'use client';

import { ChevronDown, TrendingUp, Filter, Plus, Search, Settings, Bell, LayoutGrid } from 'lucide-react';
import { indexData, watchlists } from '../data/mockData';

interface HeaderProps {
  variant: 'classic' | 'pro' | 'investor' | 'beginner' | 'dark';
  currentWatchlist?: string;
  onWatchlistChange?: (name: string) => void;
}

export default function Header({ variant, currentWatchlist = 'MACD Bullish Cross', onWatchlistChange }: HeaderProps) {
  const activeWatchlist = watchlists.find(w => w.name === currentWatchlist) || watchlists[0];
  
  if (variant === 'dark') {
    return (
      <div className="bg-[#0D0D0D] text-white">
        {/* App Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">up</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{currentWatchlist}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <span className="text-xs text-gray-500">{activeWatchlist.count}/{activeWatchlist.total} scrips</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition">
              <Search size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition">
              <LayoutGrid size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition">
              <Plus size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Index Ticker */}
        <div className="flex gap-4 px-4 py-2 overflow-x-auto no-scrollbar border-b border-gray-800">
          {indexData.map((idx) => (
            <div key={idx.name} className="flex-shrink-0">
              <div className="text-xs text-gray-500">{idx.name}</div>
              <div className="flex items-baseline gap-2">
                <span className={`font-semibold ${idx.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {idx.value.toLocaleString()}
                </span>
                <span className={`text-xs ${idx.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'pro') {
    return (
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        {/* Compact App Bar */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <TrendingUp size={14} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded-lg transition">
              <span className="font-medium text-sm">{currentWatchlist}</span>
              <ChevronDown size={14} />
            </div>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{activeWatchlist.count}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition text-xs font-medium flex items-center gap-1">
              <Filter size={14} />
              Filters
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition">
              <Settings size={14} />
            </button>
            <button className="p-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition">
              <Plus size={14} />
            </button>
          </div>
        </div>
        
        {/* Live Index Strip */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-black/20 text-xs overflow-x-auto no-scrollbar">
          {indexData.map((idx) => (
            <div key={idx.name} className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg flex-shrink-0">
              <span className="text-gray-400">{idx.name}</span>
              <span className={`font-medium ${idx.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {idx.value.toLocaleString()}
              </span>
              <span className={`${idx.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {idx.changePercent >= 0 ? '↑' : '↓'}{Math.abs(idx.changePercent).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
        
        {/* Quick Filters */}
        <div className="flex gap-2 px-3 py-2 overflow-x-auto no-scrollbar">
          {['All', 'FnO Only', 'Gainers', 'Losers', 'Volume Spike', 'OI Buildup'].map((filter, i) => (
            <button 
              key={filter}
              className={`px-3 py-1 rounded-full text-xs font-medium transition flex-shrink-0
                ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'investor') {
    return (
      <div className="bg-white border-b border-gray-100">
        {/* Clean App Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold">W</span>
            </div>
            <div>
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="font-semibold text-gray-900">{currentWatchlist}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <span className="text-xs text-gray-400">{activeWatchlist.count} stocks tracked</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition">
              <Bell size={20} className="text-gray-500" />
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
              <Plus size={16} />
              Add Stock
            </button>
          </div>
        </div>
        
        {/* Market Overview Cards */}
        <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar">
          {indexData.slice(0, 2).map((idx) => (
            <div key={idx.name} className="flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-3 min-w-[160px]">
              <div className="text-xs text-gray-500 font-medium">{idx.name}</div>
              <div className={`text-lg font-bold ${idx.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {idx.value.toLocaleString()}
              </div>
              <div className={`text-xs font-medium ${idx.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {idx.change >= 0 ? '▲' : '▼'} {Math.abs(idx.change).toFixed(2)} ({Math.abs(idx.changePercent).toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>
        
        {/* View Tabs */}
        <div className="flex gap-4 px-4 border-t border-gray-100">
          {['Overview', 'Fundamentals', 'Dividends', 'Alerts'].map((tab, i) => (
            <button 
              key={tab}
              className={`py-3 text-sm font-medium border-b-2 transition
                ${i === 0 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'beginner') {
    return (
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        {/* Friendly App Bar */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <div className="text-sm opacity-80">Good morning!</div>
                <div className="font-semibold">Your Watchlist</div>
              </div>
            </div>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
              <Search size={20} />
            </button>
          </div>
          
          {/* Simplified Market Status */}
          <div className="bg-white/20 rounded-2xl p-4 backdrop-blur">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">Market Today</span>
              <span className="text-xs bg-white/30 px-2 py-1 rounded-full">Live</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-2xl font-bold">{indexData[0].value.toLocaleString()}</div>
                <div className={`text-sm ${indexData[0].change >= 0 ? 'text-emerald-200' : 'text-red-200'}`}>
                  NIFTY 50 • {indexData[0].change >= 0 ? '↑' : '↓'} {Math.abs(indexData[0].changePercent).toFixed(2)}%
                </div>
              </div>
              <div className="flex-1 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <span className="text-xs opacity-60">📊 Mini Chart</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Watchlist Selector Pills */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
          {watchlists.slice(0, 3).map((wl) => (
            <button 
              key={wl.id}
              onClick={() => onWatchlistChange?.(wl.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition flex-shrink-0
                ${wl.name === currentWatchlist 
                  ? 'bg-white text-emerald-600' 
                  : 'bg-white/20 hover:bg-white/30'}`}
            >
              {wl.name} ({wl.count})
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Classic (improved)
  return (
    <div className="bg-[#6B2D5B] text-white">
      {/* App Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <span className="font-bold text-lg">up</span>
            <span className="text-[8px] absolute -bottom-1 bg-blue-500 px-1 rounded">✓</span>
          </div>
          <div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 rounded-lg px-2 py-1 -ml-2 transition">
              <span className="font-semibold">{currentWatchlist}</span>
              <ChevronDown size={16} className="opacity-70" />
            </div>
            <span className="text-xs opacity-70 ml-2">{activeWatchlist.count}/{activeWatchlist.total} scrips • List by You</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg transition" title="360 View">
            <TrendingUp size={20} className="opacity-80" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition" title="Sort & Filter">
            <Filter size={20} className="opacity-80" />
          </button>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition" title="Add Scrip">
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      {/* Index Strip */}
      <div className="flex items-center px-4 py-2 bg-black/10 overflow-x-auto no-scrollbar">
        {indexData.slice(0, 2).map((idx, i) => (
          <div key={idx.name} className={`flex-shrink-0 ${i > 0 ? 'ml-4 pl-4 border-l border-white/20' : ''}`}>
            <div className="text-xs opacity-70">{idx.name}</div>
            <div className="flex items-baseline gap-2">
              <span className={`font-semibold ${idx.change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {idx.value.toLocaleString()}
              </span>
              <span className={`text-xs ${idx.change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
        <ChevronDown size={16} className="ml-auto opacity-50 flex-shrink-0" />
      </div>
    </div>
  );
}
