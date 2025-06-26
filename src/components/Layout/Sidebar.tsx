import React from 'react';
import { BarChart3, Gift, Settings, QrCode } from 'lucide-react';

interface SidebarProps {
  activeRoute: string;
  onRouteChange: (route: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onRouteChange }) => {
  const menuItems = [
    { id: 'promos', label: 'Promo List', icon: Gift },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Shop-Code</h1>
            <p className="text-sm text-[#A0A0A8]">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onRouteChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-[#6C63FF] text-white shadow-lg'
                      : 'text-[#2B2C34] hover:bg-gray-50 hover:text-[#6C63FF]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#2B2C34]">John Doe</p>
            <p className="text-xs text-[#A0A0A8]">Local Shop Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;