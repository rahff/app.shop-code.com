import { useState } from 'react';
import BottomNavigation from './components/Layout/BottomNavigation';
import Header from './components/Layout/Header';
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
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-1 overflow-auto pb-20">
        {renderContent()}
      </main>
      <BottomNavigation activeRoute={activeRoute} onRouteChange={setActiveRoute} />
    </div>
  );
}

export default App;