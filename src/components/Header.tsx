import React from 'react';
import { ChevronDown, TrendingUp, Menu, Plus } from 'lucide-react';

interface HeaderProps {
  watchlistName: string;
  stockCount: number;
  createdBy: string;
  score?: number;
}

export const Header: React.FC<HeaderProps> = ({
  watchlistName,
  stockCount,
  createdBy,
  score = 360
}) => {
  return (
    <div className="bg-upstox-purple text-white p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-upstox-purple font-bold text-sm">UP</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">{watchlistName}</h1>
              <ChevronDown size={20} />
            </div>
            <p className="text-sm opacity-90">{stockCount}/100 scrips · List by {createdBy}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <TrendingUp size={24} />
            <span className="text-sm font-bold">{score}</span>
          </div>
          <Menu size={24} />
          <Plus size={24} />
        </div>
      </div>
    </div>
  );
};
