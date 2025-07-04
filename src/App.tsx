import { useState, useCallback } from 'react';
import BootstrapComponent from './components/Bootstrap/BootstrapComponent';
import RefreshSessionComponent from './components/RefreshSession/RefreshSessionComponent';
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
import {Authentication} from "./core/Model/Authentication.ts";
import {
  APP_ROUTE, CREATE_PROMO_ROUTE, CREATE_SHOP_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_PAGE_ROUTE,
  MY_SHOPS_ROUTE,
  REFRESH_SESSION_ROUTE
} from "./core/Common/constants.ts";


export type AppRoute =
    typeof APP_ROUTE |
    typeof REFRESH_SESSION_ROUTE|
    typeof MY_SHOPS_ROUTE |
    typeof DASHBOARD_ROUTE |
    typeof ERROR_PAGE_ROUTE |
    typeof CREATE_PROMO_ROUTE |
    typeof CREATE_SHOP_ROUTE |
    'redeem-coupon' |
    'upgrade-plan' |
    'add-cashier' |
    'help-support';

function App() {
  const [appRoute, setAppRoute] = useState<AppRoute>('bootstrap');
  const [activeRoute, setActiveRoute] = useState('promos');
  const [scannedCoupon, setScannedCoupon] = useState<CouponData | null>(null);
  const [authentication, setAuthentication] = useState<Authentication | null>(null);

  // Handle bootstrap completion - determines initial app destination
  const redirectUser = useCallback((destination: AppRoute) => {
    setAppRoute(destination);
  }, []);

  const onAuthentication = useCallback((authentication: Authentication) => {
    setAuthentication(authentication);
  }, [])

  // Handle shop selection - enter main dashboard
  const handleShopSelect = useCallback((shop: ShopData) => {
    userSession.shop_selected(shop);
    setAppRoute('dashboard');
  }, []);

  // Handle choose another shop - return to shop list
  const handleChooseAnotherShop = useCallback(() => {
    setAppRoute('my-shops');
  }, []);

  // Handle scan success - navigate to redeem coupon
  const handleScanSuccess = (coupon: CouponData) => {
    setScannedCoupon(coupon);
    setAppRoute('redeem-coupon');
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
    setAppRoute('dashboard');
    setActiveRoute('promos');
  };

  // Handle redeem cancel - return to dashboard
  const handleRedeemCancel = () => {
    setScannedCoupon(null);
    setAppRoute('dashboard');
    setActiveRoute('promos');
  };

  // Handle upgrade plan actions
  const handleUpgradeComplete = () => {
    setAppRoute('dashboard');
    setActiveRoute('settings');
  };

  const handleUpgradeCancel = () => {
    setAppRoute('dashboard');
    setActiveRoute('settings');
  };

  // Handle add cashier actions
  const handleAddCashierComplete = () => {
    setAppRoute('dashboard');
    setActiveRoute('settings');
  };

  const handleAddCashierCancel = () => {
    setAppRoute('dashboard');
    setActiveRoute('settings');
  };

  // Handle help support actions
  const handleHelpSupportCancel = () => {
    setAppRoute('dashboard');
    setActiveRoute('settings');
  };

  // Render dashboard content based on active route
  const renderDashboardContent = () => {
    switch (activeRoute) {
      case 'promos':
        return <PromoListComponent redirectUser={redirectUser} />;
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
        return <Settings redirectUser={redirectUser} account_ref={authentication!.account_ref!} />;
      default:
        return <PromoListComponent redirectUser={redirectUser} />;
    }
  };

  // Main app rendering logic
  switch (appRoute) {
    case 'bootstrap':
      return <BootstrapComponent redirectUser={redirectUser} onAuthentication={onAuthentication} />;
    
    case 'refresh-session':
      return <RefreshSessionComponent redirectUser={redirectUser} onAuthentication={onAuthentication} />;
    
    case 'my-shops':
      return <ShopListComponent onShopSelect={handleShopSelect} userId={authentication!.user_id} redirectUser={redirectUser} />;
    
    case 'create-promo':
      return <CreatePromoPage redirectUser={redirectUser} />;
    
    case 'create-shop':
      return <CreateShopPage redirectUser={redirectUser} />;
    
    case 'redeem-coupon':
      return (
        <RedeemCouponView 
          couponData={scannedCoupon!}
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
          <Header onChooseAnotherShop={handleChooseAnotherShop} userProfile={userSession.its_profile()!} />
          <main className="flex-1 overflow-auto pb-20">
            {renderDashboardContent()}
          </main>
          <BottomNavigation activeRoute={activeRoute} onRouteChange={setActiveRoute} />
        </div>
      );
    
    default:
      return <BootstrapComponent redirectUser={redirectUser} onAuthentication={onAuthentication} />;
  }
}

export default App;