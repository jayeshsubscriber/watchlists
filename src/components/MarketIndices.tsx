import React from 'react';
import { MarketIndex } from '../types';
import { ChevronDown } from 'lucide-react';

interface MarketIndicesProps {
  indices: MarketIndex[];
}

export const MarketIndices: React.FC<MarketIndicesProps> = ({ indices }) => {
  return (
    <div className="bg-gray-100 border-b border-gray-300 overflow-x-auto">
      <div className="flex divide-x divide-gray-300">
        {indices.map((index, i) => (
          <div key={i} className="flex-1 p-3 min-w-[200px]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-gray-700">{index.name}</span>
              {i === indices.length - 1 && <ChevronDown size={16} className="text-gray-600" />}
            </div>
            <div className="flex items-baseline justify-between">
              <span className={`text-xl font-bold ${index.change >= 0 ? 'text-upstox-green' : 'text-upstox-red'}`}>
                {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <div className="text-right">
                <div className={`text-sm ${index.change >= 0 ? 'text-upstox-green' : 'text-upstox-red'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                </div>
                <div className={`text-xs ${index.change >= 0 ? 'text-upstox-green' : 'text-upstox-red'}`}>
                  ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
