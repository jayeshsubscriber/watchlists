'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, BarChart3, Target, 
  Briefcase, Bell, ChevronRight, Info, Zap, 
  ArrowUpRight, ArrowDownRight, Activity, Layers
} from 'lucide-react';
import { Stock } from '../data/mockData';

interface StockRowProps {
  stock: Stock;
  variant: 'classic' | 'pro' | 'investor' | 'beginner' | 'dark';
  index: number;
  onBuy?: () => void;
  onSell?: () => void;
}

export default function StockRow({ stock, variant, index, onBuy, onSell }: StockRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  const isGain = stock.change >= 0;
  const volumeSpike = stock.volume && stock.avgVolume && (stock.volume / stock.avgVolume) > 1.5;
  const near52High = stock.high52w && (stock.price / stock.high52w) > 0.9;
  const near52Low = stock.low52w && (stock.price / stock.low52w) < 1.1;

  // 52-week position (0-100%)
  const position52w = stock.high52w && stock.low52w 
    ? ((stock.price - stock.low52w) / (stock.high52w - stock.low52w)) * 100 
    : 50;

  if (variant === 'dark') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="border-b border-gray-800 last:border-b-0"
      >
        <div 
          className="px-4 py-3 hover:bg-gray-900/50 transition cursor-pointer active:bg-gray-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{stock.symbol}</span>
                {stock.hasOptions && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded">F&O</span>
                )}
                {stock.isInPortfolio && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded flex items-center gap-0.5">
                    <Briefcase size={8} /> Held
                  </span>
                )}
                {volumeSpike && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded flex items-center gap-0.5">
                    <Zap size={8} /> Vol
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{stock.exchange}</div>
            </div>
            
            <div className="text-right">
              <div className={`font-semibold text-lg ${isGain ? 'text-emerald-400' : 'text-red-400'}`}>
                {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-xs flex items-center justify-end gap-1 ${isGain ? 'text-emerald-400' : 'text-red-400'}`}>
                {isGain ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {isGain ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          {/* Mini 52w Bar */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-gray-600">52W</span>
            <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden relative">
              <div 
                className={`absolute h-full rounded-full ${isGain ? 'bg-emerald-500' : 'bg-red-500'}`}
                style={{ width: `${position52w}%` }}
              />
              <div 
                className="absolute w-1.5 h-1.5 bg-white rounded-full top-1/2 -translate-y-1/2"
                style={{ left: `calc(${position52w}% - 3px)` }}
              />
            </div>
            <span className="text-[10px] text-gray-600">{stock.high52w?.toLocaleString()}</span>
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-gray-900/30"
            >
              <div className="px-4 py-3 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-gray-500">Volume</div>
                  <div className="text-white font-medium">{(stock.volume! / 100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="text-gray-500">Day Range</div>
                  <div className="text-white font-medium">{stock.dayLow} - {stock.dayHigh}</div>
                </div>
                <div>
                  <div className="text-gray-500">VWAP</div>
                  <div className="text-white font-medium">{stock.vwap}</div>
                </div>
              </div>
              <div className="px-4 pb-3 flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onBuy?.(); }}
                  className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition"
                >
                  BUY
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onSell?.(); }}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                >
                  SELL
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (variant === 'pro') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
        className="border-b border-slate-700 last:border-b-0 bg-slate-900 hover:bg-slate-800/50 transition"
      >
        <div className="px-3 py-2">
          <div className="flex items-center gap-3">
            {/* Symbol & Tags */}
            <div className="w-24 flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-white text-sm">{stock.symbol}</span>
                {stock.hasFutures && <span className="text-[8px] text-orange-400">F</span>}
                {stock.hasOptions && <span className="text-[8px] text-purple-400">O</span>}
              </div>
              <div className="text-[10px] text-slate-500">{stock.exchange}</div>
            </div>
            
            {/* Price */}
            <div className="w-20 text-right flex-shrink-0">
              <div className={`font-bold ${isGain ? 'text-emerald-400' : 'text-red-400'}`}>
                {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-[10px] ${isGain ? 'text-emerald-400' : 'text-red-400'}`}>
                {isGain ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </div>
            </div>
            
            {/* Volume with spike indicator */}
            <div className="w-16 text-right flex-shrink-0">
              <div className={`text-xs ${volumeSpike ? 'text-amber-400 font-medium' : 'text-slate-400'}`}>
                {stock.volume ? (stock.volume / 100000).toFixed(0) + 'L' : '-'}
              </div>
              <div className="text-[10px] text-slate-600">Vol</div>
            </div>
            
            {/* OI (for FnO) */}
            {stock.hasOptions && (
              <div className="w-16 text-right flex-shrink-0">
                <div className={`text-xs ${stock.oiChange && stock.oiChange > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.oi ? (stock.oi / 100000).toFixed(0) + 'L' : '-'}
                </div>
                <div className="text-[10px] text-slate-600">
                  OI {stock.oiChange ? (stock.oiChange > 0 ? '↑' : '↓') + Math.abs(stock.oiChange).toFixed(1) + '%' : ''}
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="flex gap-1 ml-auto">
              <button className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs rounded transition">
                B
              </button>
              <button className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded transition">
                S
              </button>
              <button className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded transition">
                <BarChart3 size={12} />
              </button>
              {stock.hasOptions && (
                <button className="px-2 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 text-xs rounded transition">
                  <Layers size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'investor') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-4 mb-3 overflow-hidden hover:shadow-md transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-lg">{stock.symbol}</span>
                {stock.isInPortfolio && (
                  <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-medium">
                    In Portfolio
                  </span>
                )}
                {stock.analystRating && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${stock.analystRating === 'strong_buy' ? 'bg-emerald-100 text-emerald-700' : ''}
                    ${stock.analystRating === 'buy' ? 'bg-green-100 text-green-700' : ''}
                    ${stock.analystRating === 'hold' ? 'bg-amber-100 text-amber-700' : ''}
                    ${stock.analystRating === 'sell' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {stock.analystRating.replace('_', ' ').toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">{stock.sector}</div>
            </div>
            
            <div className="text-right">
              <div className={`font-bold text-xl ${isGain ? 'text-emerald-600' : 'text-red-600'}`}>
                ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-sm font-medium flex items-center justify-end gap-1 ${isGain ? 'text-emerald-600' : 'text-red-600'}`}>
                {isGain ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isGain ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          {/* Fundamental Quick View */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
            <div>
              <div className="text-xs text-gray-400">P/E</div>
              <div className="font-semibold text-gray-700">{stock.pe || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Market Cap</div>
              <div className="font-semibold text-gray-700">{stock.marketCap || '-'}</div>
            </div>
            {stock.dividendYield && (
              <div>
                <div className="text-xs text-gray-400">Div Yield</div>
                <div className="font-semibold text-emerald-600">{stock.dividendYield}%</div>
              </div>
            )}
            {stock.targetPrice && (
              <div className="ml-auto">
                <div className="text-xs text-gray-400">Target</div>
                <div className={`font-semibold flex items-center gap-1 ${stock.targetPrice > stock.price ? 'text-emerald-600' : 'text-red-600'}`}>
                  ₹{stock.targetPrice}
                  <span className="text-xs">
                    ({stock.targetPrice > stock.price ? '+' : ''}{((stock.targetPrice - stock.price) / stock.price * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* 52 Week Context Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>52W Low: ₹{stock.low52w?.toLocaleString()}</span>
              <span>52W High: ₹{stock.high52w?.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-200 via-amber-200 to-emerald-200 w-full" />
              <div 
                className="absolute w-3 h-3 bg-gray-800 rounded-full top-1/2 -translate-y-1/2 border-2 border-white shadow"
                style={{ left: `calc(${position52w}% - 6px)` }}
              />
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="p-4 bg-gray-50 flex gap-2">
                <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2">
                  <TrendingUp size={16} />
                  Buy
                </button>
                <button className="py-3 px-4 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl transition hover:bg-gray-100">
                  <Bell size={16} />
                </button>
                <button className="py-3 px-4 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl transition hover:bg-gray-100">
                  <BarChart3 size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (variant === 'beginner') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-4 mb-3 overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Stock Avatar */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold
                ${isGain ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-red-400 to-orange-500'}`}>
                {stock.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{stock.symbol}</div>
                <div className="text-sm text-gray-400">{stock.sector || stock.exchange}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-bold text-lg ${isGain ? 'text-emerald-600' : 'text-red-600'}`}>
                ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-sm flex items-center justify-end gap-1 
                ${isGain ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} 
                px-2 py-0.5 rounded-full font-medium`}>
                {isGain ? '↑' : '↓'} {Math.abs(stock.changePercent).toFixed(2)}%
              </div>
            </div>
          </div>
          
          {/* Simple Explanation for Beginners */}
          {volumeSpike && (
            <div className="mt-3 p-3 bg-amber-50 rounded-xl flex items-start gap-2">
              <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <span className="font-medium">High Activity!</span> More people are trading this stock today than usual.
              </div>
            </div>
          )}
          
          {near52High && (
            <div className="mt-3 p-3 bg-emerald-50 rounded-xl flex items-start gap-2">
              <TrendingUp size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-800">
                <span className="font-medium">Near Year High!</span> This stock is close to its highest price in 1 year.
              </div>
            </div>
          )}
          
          {near52Low && (
            <div className="mt-3 p-3 bg-blue-50 rounded-xl flex items-start gap-2">
              <Target size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <span className="font-medium">Near Year Low!</span> Could be a buying opportunity - do your research.
              </div>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              {/* Simple Stats */}
              <div className="px-4 py-3 bg-gray-50 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">Today&apos;s Range</div>
                  <div className="font-semibold text-gray-700">₹{stock.dayLow} - ₹{stock.dayHigh}</div>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">1 Year Range</div>
                  <div className="font-semibold text-gray-700">₹{stock.low52w} - ₹{stock.high52w}</div>
                </div>
              </div>
              
              {/* Guided Actions */}
              <div className="p-4 flex gap-2">
                <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2">
                  <span>🛒</span> Buy Stock
                </button>
                <button className="py-3 px-4 bg-gray-100 text-gray-600 font-semibold rounded-xl transition hover:bg-gray-200 flex items-center gap-2">
                  <span>📊</span> Learn More
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Classic improved
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-gray-100 last:border-b-0 bg-white hover:bg-gray-50 transition"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{stock.symbol}</span>
              {stock.hasOptions && (
                <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">F&O</span>
              )}
              {stock.isInPortfolio && (
                <Briefcase size={12} className="text-blue-500" />
              )}
              {volumeSpike && (
                <Activity size={12} className="text-amber-500" />
              )}
            </div>
            <div className="text-xs text-gray-400">{stock.exchange}</div>
          </div>
          
          <div className="text-right">
            <div className={`font-bold text-lg ${isGain ? 'text-green-600' : 'text-red-600'}`}>
              {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-xs ${isGain ? 'text-green-600' : 'text-red-600'}`}>
              {isGain ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50"
          >
            <div className="px-4 py-3 grid grid-cols-4 gap-2 text-xs">
              <div>
                <div className="text-gray-400">Volume</div>
                <div className="font-semibold text-gray-700">{(stock.volume! / 100000).toFixed(1)}L</div>
              </div>
              <div>
                <div className="text-gray-400">VWAP</div>
                <div className="font-semibold text-gray-700">{stock.vwap}</div>
              </div>
              <div>
                <div className="text-gray-400">Day H/L</div>
                <div className="font-semibold text-gray-700">{stock.dayHigh}/{stock.dayLow}</div>
              </div>
              <div>
                <div className="text-gray-400">52W H/L</div>
                <div className="font-semibold text-gray-700">{stock.high52w}/{stock.low52w}</div>
              </div>
            </div>
            <div className="px-4 pb-3 flex gap-2">
              <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition text-sm">
                BUY
              </button>
              <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition text-sm">
                SELL
              </button>
              <button className="py-2 px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition">
                <BarChart3 size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
