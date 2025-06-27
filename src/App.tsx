import React, { useState, useCallback } from 'react';
import BootstrapComponent from './components/Bootstrap/BootstrapComponent';
import LoginComponent from './components/Login/LoginComponent';
import ShopListComponent from './components/ShopList/ShopListComponent';
import BottomNavigation from './components/Layout/BottomNavigation';
import Header from './components/Layout/Header';
import PromoListComponent from './components/PromoList/PromoListComponent.tsx';
import Statistics from './components/Statistics/Statistics';
import Settings from './components/Settings/Settings';

type AppState = 'bootstrap' | 'login' | 'shops' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('bootstrap');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeRoute, setActiveRoute] = useState('promos');

  // Handle bootstrap completion - determines initial app destination
  const handleBootstrapComplete = useCallback((destination: string, error?: string) => {
    if (error) {
      setErrorMessage(error);
      setAppState('login');
    } else if (destination === 'shops') {
      setAppState('shops');
    } else {
      setAppState('login');
    }
  }, []);

  // Handle successful login - redirect to shops list
  const handleLoginSuccess = useCallback(() => {
    setErrorMessage('');
    setAppState('shops');
  }, []);

  // Handle shop selection - enter main dashboard
  const handleShopSelect = useCallback((shopId: string) => {
    console.log('Selected shop:', shopId);
    // In a real app, you'd store the selected shop in context/state
    setAppState('dashboard');
  }, []);

  // Render dashboard content based on active route
  const renderDashboardContent = () => {
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

  // Main app rendering logic
  switch (appState) {
    case 'bootstrap':
      return <BootstrapComponent onBootstrapComplete={handleBootstrapComplete} />;
    
    case 'login':
      return (
        <LoginComponent 
          errorMessage={errorMessage} 
          onLoginSuccess={handleLoginSuccess} 
        />
      );
    
    case 'shops':
      return <ShopListComponent onShopSelect={handleShopSelect} />;
    
    case 'dashboard':
      return (
        <div className="flex flex-col h-screen bg-gray-50">
          <Header />
          <main className="flex-1 overflow-auto pb-20">
            {renderDashboardContent()}
          </main>
          <BottomNavigation activeRoute={activeRoute} onRouteChange={setActiveRoute} />
        </div>
      );
    
    default:
      return <BootstrapComponent onBootstrapComplete={handleBootstrapComplete} />;
  }
}

export default App;