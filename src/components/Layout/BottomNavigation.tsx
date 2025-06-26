import React from 'react';
import { BarChart3, Gift, Settings } from 'lucide-react';

interface BottomNavigationProps {
  activeRoute: string;
  onRouteChange: (route: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeRoute, onRouteChange }) => {
  const menuItems = [
    { id: 'promos', label: 'Promos', icon: Gift },
    { id: 'statistics', label: 'Stats', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onRouteChange(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'text-[#6C63FF]'
                  : 'text-[#A0A0A8] hover:text-[#6C63FF]'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10'
                  : 'hover:bg-gray-50'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium mt-1 truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;