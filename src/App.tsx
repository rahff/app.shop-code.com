import { useState, useCallback } from 'react';
import BootstrapComponent from './components/Bootstrap/BootstrapComponent';
import LoginComponent from './components/Login/LoginComponent';
import ShopListComponent from './components/ShopList/ShopListComponent';
import BottomNavigation from './components/Layout/BottomNavigation';
import Header from './components/Layout/Header';
import PromoListComponent from './components/PromoList/PromoListComponent.tsx';
import Statistics from './components/Statistics/Statistics';
import Settings from './components/Settings/Settings';
import CreatePromoPage from './components/CreatePromo/CreatePromoPage';
import CreateShopPage from './components/CreateShop/CreateShopPage';

type AppState = 'bootstrap' | 'login' | 'my-shops' | 'dashboard' | 'error' | 'create-promo' | 'create-shop';

function App() {
  const [appState, setAppState] = useState<AppState>('bootstrap');
  const [activeRoute, setActiveRoute] = useState('promos');

  // Handle bootstrap completion - determines initial app destination
  const redirectUser = useCallback((destination: string) => {
    switch (destination) {
      case 'login':
        setAppState('login');
        break;
      case 'my-shops':
        setAppState('my-shops');
        break;
      case 'dashboard':
        setAppState('dashboard');
        break;
      case 'error':
        setAppState('error');
        break;
      default: setAppState('login');
    }
  }, []);

  // Handle successful login - redirect to shops list
  const handleLoginSuccess = useCallback(() => {
    setAppState('my-shops');
  }, []);

  // Handle shop selection - enter main dashboard
  const handleShopSelect = useCallback((shopId: string) => {
    console.log('Selected shop:', shopId);
    // In a real app, you'd store the selected shop in context/state
    setAppState('dashboard');
  }, []);

  // Check for route changes based on URL
  const checkRoute = () => {
    const path = window.location.pathname;
    if (path === '/promo/create') {
      setAppState('create-promo');
    } else if (path === '/shop/create') {
      setAppState('create-shop');
    }
  };

  // Listen for route changes
  useState(() => {
    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  });

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
      return <BootstrapComponent redirectUser={redirectUser} />;
    
    case 'login':
      return (
        <LoginComponent
          onLoginSuccess={handleLoginSuccess} 
        />
      );
    
    case 'my-shops':
      return <ShopListComponent onShopSelect={handleShopSelect} />;
    
    case 'create-promo':
      return <CreatePromoPage />;
    
    case 'create-shop':
      return <CreateShopPage />;
    
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
      return <BootstrapComponent redirectUser={redirectUser} />;
  }
}

export default App;