'use client';

import { Home, ListTodo, ShoppingCart, Briefcase, Wallet } from 'lucide-react';

interface BottomNavProps {
  variant: 'classic' | 'pro' | 'investor' | 'beginner' | 'dark';
}

export default function BottomNav({ variant }: BottomNavProps) {
  const navItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: ListTodo, label: 'My lists', active: true },
    { icon: ShoppingCart, label: 'Orders', active: false },
    { icon: Briefcase, label: 'Portfolio', active: false },
    { icon: Wallet, label: 'Funds', active: false },
  ];

  if (variant === 'dark') {
    return (
      <nav className="bg-[#0D0D0D] border-t border-gray-800 px-2 py-2 flex justify-around items-center">
        {navItems.map((item) => (
          <button 
            key={item.label}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition
              ${item.active 
                ? 'bg-white/10 text-white' 
                : 'text-gray-500 hover:text-gray-300'}`}
          >
            <item.icon size={20} strokeWidth={item.active ? 2.5 : 1.5} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  if (variant === 'pro') {
    return (
      <nav className="bg-slate-900 border-t border-slate-700 px-2 py-1 flex justify-around items-center">
        {navItems.map((item) => (
          <button 
            key={item.label}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition
              ${item.active 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-slate-500 hover:text-slate-300'}`}
          >
            <item.icon size={18} strokeWidth={item.active ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  if (variant === 'investor') {
    return (
      <nav className="bg-white border-t border-gray-100 px-4 py-2 flex justify-around items-center shadow-lg shadow-gray-200/50">
        {navItems.map((item) => (
          <button 
            key={item.label}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition
              ${item.active 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-400 hover:text-gray-600'}`}
          >
            <item.icon size={22} strokeWidth={item.active ? 2.5 : 1.5} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  if (variant === 'beginner') {
    return (
      <nav className="bg-white border-t border-gray-100 px-2 py-3 flex justify-around items-center">
        {navItems.map((item) => (
          <button 
            key={item.label}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition relative
              ${item.active 
                ? 'text-emerald-600' 
                : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className={`p-2 rounded-xl transition ${item.active ? 'bg-emerald-100' : ''}`}>
              <item.icon size={22} strokeWidth={item.active ? 2.5 : 1.5} />
            </div>
            <span className="text-xs font-medium">{item.label}</span>
            {item.active && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>
    );
  }

  // Classic
  return (
    <nav className="bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center">
      {navItems.map((item) => (
        <button 
          key={item.label}
          className={`flex flex-col items-center gap-1 px-4 py-1 transition
            ${item.active 
              ? 'text-[#6B2D5B]' 
              : 'text-gray-400 hover:text-gray-600'}`}
        >
          <item.icon size={22} strokeWidth={item.active ? 2.5 : 1.5} />
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
