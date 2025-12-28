import { useState } from 'react';
import { Header } from './components/Header';
import { MarketIndices } from './components/MarketIndices';
import { EnhancedDefaultView } from './views/EnhancedDefaultView';
import { CardBasedView } from './views/CardBasedView';
import { HeatmapView } from './views/HeatmapView';
import { FnOView } from './views/FnOView';
import { BeginnerView } from './views/BeginnerView';
import { mockWatchlist } from './data/mockData';
import { ViewMode } from './types';
import { List, LayoutGrid, Grid3x3, TrendingUp, GraduationCap, ChevronDown } from 'lucide-react';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showViewSelector, setShowViewSelector] = useState(false);

  const viewModes = [
    {
      id: 'list' as ViewMode,
      name: 'Enhanced List',
      icon: List,
      description: 'Quick actions & mini charts',
      color: 'bg-blue-500'
    },
    {
      id: 'cards' as ViewMode,
      name: 'Card View',
      icon: LayoutGrid,
      description: 'Investor focused with targets',
      color: 'bg-purple-500'
    },
    {
      id: 'heatmap' as ViewMode,
      name: 'Heatmap',
      icon: Grid3x3,
      description: 'Visual intraday performance',
      color: 'bg-orange-500'
    },
    {
      id: 'fno' as ViewMode,
      name: 'F&O Mode',
      icon: TrendingUp,
      description: 'Options & derivatives focus',
      color: 'bg-green-500'
    },
    {
      id: 'beginner' as ViewMode,
      name: 'Beginner Mode',
      icon: GraduationCap,
      description: 'Learn as you invest',
      color: 'bg-pink-500'
    },
  ];

  const currentView = viewModes.find(v => v.id === viewMode);

  const renderView = () => {
    switch (viewMode) {
      case 'list':
        return <EnhancedDefaultView stocks={mockWatchlist.stocks} />;
      case 'cards':
        return <CardBasedView stocks={mockWatchlist.stocks} />;
      case 'heatmap':
        return <HeatmapView stocks={mockWatchlist.stocks} />;
      case 'fno':
        return <FnOView stocks={mockWatchlist.stocks} />;
      case 'beginner':
        return <BeginnerView stocks={mockWatchlist.stocks} />;
      default:
        return <EnhancedDefaultView stocks={mockWatchlist.stocks} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Prototype Info Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 text-center text-sm font-semibold sticky top-0 z-50 shadow-md">
        🎨 Upstox Watchlist Prototypes - Interactive UI Variations Demo
      </div>

      {/* View Mode Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-[36px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current View Mode</h2>
              <button
                onClick={() => setShowViewSelector(!showViewSelector)}
                className="flex items-center gap-2 font-bold text-lg text-gray-800 hover:text-upstox-purple transition"
              >
                {currentView && <currentView.icon size={24} />}
                <span>{currentView?.name}</span>
                <ChevronDown size={20} className={`transition-transform ${showViewSelector ? 'rotate-180' : ''}`} />
              </button>
              <p className="text-xs text-gray-500 mt-0.5">{currentView?.description}</p>
            </div>
            <div className="hidden md:flex gap-2">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
                    viewMode === mode.id
                      ? `${mode.color} text-white shadow-md`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <mode.icon size={20} />
                  <span className="text-xs font-semibold whitespace-nowrap">{mode.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile View Selector Dropdown */}
          {showViewSelector && (
            <div className="md:hidden mt-3 grid grid-cols-2 gap-2 pb-2">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setViewMode(mode.id);
                    setShowViewSelector(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-3 rounded-lg transition ${
                    viewMode === mode.id
                      ? `${mode.color} text-white shadow-md`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <mode.icon size={20} />
                  <div className="text-left flex-1">
                    <div className="text-sm font-semibold">{mode.name}</div>
                    <div className="text-xs opacity-90">{mode.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Only show header for non-beginner modes */}
        {viewMode !== 'beginner' && (
          <>
            <Header
              watchlistName={mockWatchlist.name}
              stockCount={mockWatchlist.stockCount}
              createdBy={mockWatchlist.createdBy}
            />
            {mockWatchlist.indices && <MarketIndices indices={mockWatchlist.indices} />}
          </>
        )}

        {/* Render Selected View */}
        <div className="pb-20">
          {renderView()}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-around py-3">
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-upstox-purple transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-upstox-purple font-bold">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
              <span className="text-xs">My lists</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-upstox-purple transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs">Orders</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-upstox-purple transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Portfolio</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-upstox-purple transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">Funds</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights Overlay (Optional) */}
      <div className="hidden lg:block fixed right-4 bottom-24 bg-white rounded-lg shadow-xl p-4 max-w-xs border-2 border-purple-500">
        <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
          ✨ Prototype Features
        </h3>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>✅ 5 unique view modes</li>
          <li>✅ User segment optimization</li>
          <li>✅ Interactive quick actions</li>
          <li>✅ Real-time data visualization</li>
          <li>✅ Educational beginner mode</li>
          <li>✅ F&O trader specialized view</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
