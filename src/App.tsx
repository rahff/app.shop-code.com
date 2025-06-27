import { useState } from 'react';
import BottomNavigation from './components/Layout/BottomNavigation';
import Header from './components/Layout/Header';
import PromoListComponent from './components/PromoList/PromoListComponent.tsx';
import Statistics from './components/Statistics/Statistics';
import Settings from './components/Settings/Settings';

function App() {
  const [activeRoute, setActiveRoute] = useState('promos');

  const renderContent = () => {
    switch (activeRoute) {
      case 'promos':
        return <PromoListComponent />;
      case 'statistics':
        return <Statistics />;
      case 'settings':
        return <Settings />;
      default:
        return <PromoListComponent />;
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