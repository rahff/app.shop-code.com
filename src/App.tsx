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
import QrcodeScannerView from './components/ScanQrcode/QrcodeScannerView';
import RedeemCouponView from './components/RedeemCoupon/RedeemCouponView.tsx';
import UpgradePlanView from './components/Subscription/UpgradePlanView';
import AddCashierView from './components/AddCashier/AddCashierView.tsx';
import HelpSupportView from './components/HelpSupport/HelpSupportView.tsx';
import {userSession} from "./factory/userSessionFactory.ts";
import {ShopData} from "./core/CreateShop/api/data.ts";
import { CouponData } from './core/ScanQrcode/api/data';

type AppState = 'bootstrap' | 'login' | 'my-shops' | 'dashboard' | 'error' | 'create-promo' | 'create-shop' | 'redeem-coupon' | 'upgrade-plan' | 'add-cashier' | 'help-support';

function App() {
  const [appState, setAppState] = useState<AppState>('bootstrap');
  const [activeRoute, setActiveRoute] = useState('promos');
  const [scannedCoupon, setScannedCoupon] = useState<CouponData | null>(null);

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
  const handleShopSelect = useCallback((shop: ShopData) => {
    userSession.shop_selected(shop)
    setAppState('dashboard');
  }, []);

  // Check for route changes based on URL
  const checkRoute = () => {
    const path = window.location.pathname;
    if (path === '/promo/create') {
      setAppState('create-promo');
    } else if (path === '/shop/create') {
      setAppState('create-shop');
    } else if (path === '/upgrade-plan') {
      setAppState('upgrade-plan');
    } else if (path === '/add-cashier') {
      setAppState('add-cashier');
    } else if (path === '/help-support') {
      setAppState('help-support');
    }
  };

  // Listen for route changes
  useState(() => {
    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  });

  // Handle scan success - navigate to redeem coupon
  const handleScanSuccess = (coupon: CouponData) => {
    console.log('Scanned coupon:', coupon);
    setScannedCoupon(coupon);
    setAppState('redeem-coupon');
  };

  // Handle scan error
  const handleScanError = (error: string) => {
    console.error('Scan error:', error);
    // Return to promos view on error
    setActiveRoute('promos');
  };

  // Handle scan close/cancel - return to promos
  const handleScanClose = () => {
    setActiveRoute('promos');
  };

  // Handle redeem completion - return to dashboard
  const handleRedeemComplete = () => {
    setScannedCoupon(null);
    setAppState('dashboard');
    setActiveRoute('promos');
  };

  // Handle redeem cancel - return to dashboard
  const handleRedeemCancel = () => {
    setScannedCoupon(null);
    setAppState('dashboard');
    setActiveRoute('promos');
  };

  // Handle upgrade plan actions
  const handleUpgradeComplete = () => {
    setAppState('dashboard');
    setActiveRoute('settings');
  };

  const handleUpgradeCancel = () => {
    setAppState('dashboard');
    setActiveRoute('settings');
  };

  // Handle add cashier actions
  const handleAddCashierComplete = () => {
    setAppState('dashboard');
    setActiveRoute('settings');
  };

  const handleAddCashierCancel = () => {
    setAppState('dashboard');
    setActiveRoute('settings');
  };

  // Handle help support actions
  const handleHelpSupportCancel = () => {
    setAppState('dashboard');
    setActiveRoute('settings');
  };

  // Render dashboard content based on active route
  const renderDashboardContent = () => {
    switch (activeRoute) {
      case 'promos':
        return <PromoListComponent />;
      case 'statistics':
        return <Statistics />;
      case 'scan':
        return (
          <div className="h-full">
            <QrcodeScannerView
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
              isActive={true}
              onClose={handleScanClose}
            />
          </div>
        );
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
    
    case 'redeem-coupon':
      return (
        <RedeemCouponView 
          couponData={scannedCoupon}
          onComplete={handleRedeemComplete}
          onCancel={handleRedeemCancel}
        />
      );
    
    case 'upgrade-plan':
      return (
        <UpgradePlanView 
          onUpgrade={handleUpgradeComplete}
          onCancel={handleUpgradeCancel}
        />
      );
    
    case 'add-cashier':
      return (
        <AddCashierView 
          onComplete={handleAddCashierComplete}
          onCancel={handleAddCashierCancel}
        />
      );
    
    case 'help-support':
      return (
        <HelpSupportView 
          onCancel={handleHelpSupportCancel}
        />
      );
    
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