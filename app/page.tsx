'use client';

import { useState } from 'react';
import WatchlistView from './components/WatchlistView';
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from 'lucide-react';

type Variant = 'classic' | 'pro' | 'investor' | 'beginner' | 'dark';

const variants: { id: Variant; name: string; description: string; targetUser: string; color: string }[] = [
  { 
    id: 'classic', 
    name: 'Classic Improved', 
    description: 'Enhanced current design with better UX',
    targetUser: 'All Users',
    color: 'bg-purple-600'
  },
  { 
    id: 'pro', 
    name: 'Pro Trader', 
    description: 'Compact, data-dense view for active traders',
    targetUser: 'FnO & Intraday',
    color: 'bg-emerald-600'
  },
  { 
    id: 'investor', 
    name: 'Investor Focus', 
    description: 'Fundamental data, targets & dividends',
    targetUser: 'Equity Investors',
    color: 'bg-indigo-600'
  },
  { 
    id: 'beginner', 
    name: 'Beginner Friendly', 
    description: 'Simplified with explanations & guidance',
    targetUser: 'New Investors',
    color: 'bg-teal-600'
  },
  { 
    id: 'dark', 
    name: 'Dark Mode', 
    description: 'Easy on the eyes, premium feel',
    targetUser: 'All Users',
    color: 'bg-gray-800'
  },
];

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  
  const currentVariant = variants[currentVariantIndex];
  
  const nextVariant = () => {
    setCurrentVariantIndex((prev) => (prev + 1) % variants.length);
  };
  
  const prevVariant = () => {
    setCurrentVariantIndex((prev) => (prev - 1 + variants.length) % variants.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Watchlist Redesign Prototype</h1>
            <p className="text-sm text-slate-400 mt-1">Explore different UI variations for different user segments</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg transition flex items-center gap-2 ${viewMode === 'mobile' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              <Smartphone size={18} />
              <span className="text-sm font-medium">Mobile</span>
            </button>
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg transition flex items-center gap-2 ${viewMode === 'desktop' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              <Monitor size={18} />
              <span className="text-sm font-medium">Desktop</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* Variant Selector Sidebar */}
        <div className="lg:w-80 space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Select Variation</h2>
            <div className="space-y-2">
              {variants.map((variant, index) => (
                <button
                  key={variant.id}
                  onClick={() => setCurrentVariantIndex(index)}
                  className={`w-full p-3 rounded-xl text-left transition border ${
                    index === currentVariantIndex 
                      ? 'bg-white/10 border-white/20' 
                      : 'border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${variant.color}`} />
                    <div>
                      <div className="font-medium text-white">{variant.name}</div>
                      <div className="text-xs text-slate-400">{variant.targetUser}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Current Variant Info */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className={`w-10 h-10 rounded-xl ${currentVariant.color} flex items-center justify-center mb-3`}>
              <span className="text-white text-xl">
                {currentVariant.id === 'classic' && '🎨'}
                {currentVariant.id === 'pro' && '⚡'}
                {currentVariant.id === 'investor' && '📊'}
                {currentVariant.id === 'beginner' && '🎓'}
                {currentVariant.id === 'dark' && '🌙'}
              </span>
            </div>
            <h3 className="font-semibold text-white">{currentVariant.name}</h3>
            <p className="text-sm text-slate-400 mt-1">{currentVariant.description}</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Target Users</div>
              <div className="text-sm text-white">{currentVariant.targetUser}</div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <h3 className="font-semibold text-white mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {currentVariant.id === 'classic' && (
                <>
                  <li>• Improved tap targets & spacing</li>
                  <li>• F&O and portfolio badges</li>
                  <li>• Volume spike indicators</li>
                  <li>• Expandable row with quick actions</li>
                  <li>• Inline buy/sell buttons</li>
                </>
              )}
              {currentVariant.id === 'pro' && (
                <>
                  <li>• Compact data-dense layout</li>
                  <li>• OI & OI change visibility</li>
                  <li>• Quick filter tabs</li>
                  <li>• Inline B/S/Chart/OC buttons</li>
                  <li>• Live index strip</li>
                </>
              )}
              {currentVariant.id === 'investor' && (
                <>
                  <li>• Card-based layout</li>
                  <li>• P/E, Market Cap visibility</li>
                  <li>• Analyst ratings & targets</li>
                  <li>• Dividend yield display</li>
                  <li>• 52-week context bar</li>
                </>
              )}
              {currentVariant.id === 'beginner' && (
                <>
                  <li>• Friendly greeting header</li>
                  <li>• Stock avatars</li>
                  <li>• Contextual explanations</li>
                  <li>• Volume spike explained</li>
                  <li>• Simple CTA buttons</li>
                </>
              )}
              {currentVariant.id === 'dark' && (
                <>
                  <li>• OLED-friendly dark theme</li>
                  <li>• Mini 52-week chart</li>
                  <li>• Glowing accent colors</li>
                  <li>• Premium aesthetic</li>
                  <li>• Reduced eye strain</li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        {/* Device Preview */}
        <div className="flex-1 flex items-start justify-center">
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevVariant}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextVariant}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Phone Frame */}
            {viewMode === 'mobile' ? (
              <div className="relative">
                <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl shadow-black/50">
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
                    {/* Status Bar */}
                    <div className="absolute top-2 left-0 right-0 flex justify-between px-8 z-40 text-xs font-medium">
                      <span className={currentVariant.id === 'dark' || currentVariant.id === 'pro' ? 'text-white' : 'text-black'}>11:01</span>
                      <span className={currentVariant.id === 'dark' || currentVariant.id === 'pro' ? 'text-white' : 'text-black'}>⦿ 📶 🔋</span>
                    </div>
                    {/* Content */}
                    <div className="h-full pt-8">
                      <WatchlistView variant={currentVariant.id} />
                    </div>
                  </div>
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full" />
              </div>
            ) : (
              <div className="w-[1024px] bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                <WatchlistView variant={currentVariant.id} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-slate-500">
          <span>Watchlist UI Prototype • {variants.length} Variations</span>
          <span>Use ← → arrows or click variants to navigate</span>
        </div>
      </footer>
    </div>
  );
}
