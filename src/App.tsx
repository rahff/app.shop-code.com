import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import PromoList from './components/PromoList/PromoList';
import Statistics from './components/Statistics/Statistics';
import Settings from './components/Settings/Settings';

function App() {
  const [activeRoute, setActiveRoute] = useState('promos');

  const renderContent = () => {
    switch (activeRoute) {
      case 'promos':
        return <PromoList />;
      case 'statistics':
        return <Statistics />;
      case 'settings':
        return <Settings />;
      default:
        return <PromoList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeRoute={activeRoute} onRouteChange={setActiveRoute} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;