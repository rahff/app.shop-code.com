import {useState, useCallback, useEffect} from 'react';
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
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';
import RegionPickerComponentPage from './components/RegionPicker/RegionPickerComponentPage.tsx';
import {userSession} from "./factory/userSessionFactory.ts";
import {ShopData} from "./core/CreateShop/api/data.ts";
import { CouponData } from './core/ScanQrcode/api/data';
import {Authentication} from "./core/Model/Authentication.ts";
import {
  APP_ROUTE, CREATE_PROMO_ROUTE, CREATE_SHOP_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_PAGE_ROUTE,
  MY_SHOPS_ROUTE,
  REFRESH_SESSION_ROUTE, SET_CONFIG_ROUTE
} from "./core/Common/constants.ts";
import {AuthProvider} from 'react-oidc-context';
import {Config} from "./config.ts";
import {fetchConfig} from "./services/external/fetchConfig.ts";
import {getPromoList} from "./services/external/getPromoList.ts";
import {getShopList} from "./services/external/getShopList.ts";
import {createShop} from "./services/external/createShop.ts";

export type AppRoute =
    typeof APP_ROUTE |
    typeof REFRESH_SESSION_ROUTE|
    typeof MY_SHOPS_ROUTE |
    typeof DASHBOARD_ROUTE |
    typeof ERROR_PAGE_ROUTE |
    typeof CREATE_PROMO_ROUTE |
    typeof CREATE_SHOP_ROUTE |
    typeof SET_CONFIG_ROUTE |
    'region-picker' |
    'upload-error' |
    'redeem-coupon' |
    'upgrade-plan' |
    'add-cashier' |
    'help-support';

const nullConfig = {
  "cognito": {
    "authority": "",
    "client_id": "",
    "redirect_uri": "",
    "response_type": "code",
    "scope": "email openid profile",
    "automaticSilentRenew": true
  },
  "apiEndpoints": {
    "userSide": "",
    "shopPromo": ""
  }
} as const;

function App() {
  const [appRoute, setAppRoute] = useState<AppRoute>(SET_CONFIG_ROUTE);
  const [activeRoute, setActiveRoute] = useState('promos');
  const [scannedCoupon, setScannedCoupon] = useState<CouponData | null>(null);
  const [authentication, setAuthentication] = useState<Authentication | null>(null);
  const [config, setConfig] = useState<Config>(nullConfig);


  const onConfigReceived = (appConfig: Config) => {
    localStorage.setItem("config", JSON.stringify(appConfig));
    setConfig(appConfig);
  }
  // Check for region selection before proceeding to bootstrap
  const checkConfig = useCallback(() => {
    const localConfig = localStorage.getItem('config');
    if (localConfig === null) {
      setAppRoute(SET_CONFIG_ROUTE);
      return;
    }else {
      setConfig(JSON.parse(localConfig))
      setAppRoute(APP_ROUTE);
    }
  }, []);

  // Initialize app with region check
  useEffect(() => {
    checkConfig();
  }, [checkConfig]);

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
    setAppRoute(DASHBOARD_ROUTE);
  }, []);

  // Handle choose another shop - return to shop list
  const handleChooseAnotherShop = useCallback(() => {
    setAppRoute(MY_SHOPS_ROUTE);
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
    setAppRoute(DASHBOARD_ROUTE);
    setActiveRoute('promos');
  };

  // Handle redeem cancel - return to dashboard
  const handleRedeemCancel = () => {
    setScannedCoupon(null);
    setAppRoute(DASHBOARD_ROUTE);
    setActiveRoute('promos');
  };

  // Handle upgrade plan actions
  const handleUpgradeComplete = () => {
    setAppRoute(DASHBOARD_ROUTE);
    setActiveRoute('settings');
  };

  const handleUpgradeCancel = () => {
    setAppRoute(DASHBOARD_ROUTE);
    setActiveRoute('settings');
  };

  // Handle add cashier actions
  const handleAddCashierComplete = () => {
    setAppRoute(DASHBOARD_ROUTE);
    setActiveRoute('settings');
  };

  const handleAddCashierCancel = () => {
    setAppRoute(DASHBOARD_ROUTE);
    setActiveRoute('settings');
  };

  // Handle help support actions
  const handleHelpSupportCancel = () => {
    setAppRoute(DASHBOARD_ROUTE);
    setActiveRoute('settings');
  };

  // Render dashboard content based on active route
  const renderDashboardContent = () => {
    switch (activeRoute) {
      case 'promos':
        return <PromoListComponent redirectUser={redirectUser} getPromoList={ getPromoList(config.apiEndpoints.shopPromo, userSession.its_selected_shop().id, authentication!.token)} />;
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
        return <PromoListComponent redirectUser={redirectUser} getPromoList={ getPromoList(config.apiEndpoints.shopPromo, userSession.its_selected_shop().id, authentication!.token)} />;
    }
  };

  // Main app rendering logic
  switch (appRoute) {

    case APP_ROUTE:
      return <AuthProvider {...config.cognito}>
                <BootstrapComponent redirectUser={redirectUser} onAuthentication={onAuthentication} />;
             </AuthProvider>

    case REFRESH_SESSION_ROUTE:
      return <RefreshSessionComponent redirectUser={redirectUser} onAuthentication={onAuthentication} />;

    case MY_SHOPS_ROUTE:
      return <ShopListComponent
        onShopSelect={handleShopSelect}
        getShopList={getShopList(config.apiEndpoints.shopPromo, authentication!.account_ref!)}
        redirectUser={redirectUser}
      />;

    case CREATE_PROMO_ROUTE:
      return <CreatePromoPage redirectUser={redirectUser} />;

    case CREATE_SHOP_ROUTE:
      return <CreateShopPage redirectUser={redirectUser} createShop={createShop(config.apiEndpoints.shopPromo, authentication!.account_ref!, authentication!.token)} />;

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

    case SET_CONFIG_ROUTE:
      return <RegionPickerComponentPage redirectUser={redirectUser}
                                        onConfigReceived={onConfigReceived}
                                        fetchConfig={fetchConfig} />;

    case ERROR_PAGE_ROUTE:
      return (
        <ErrorPage
          redirectUser={redirectUser}
        />
      );

    case DASHBOARD_ROUTE:
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
      // Fallback to region check
      checkConfig();
      return null;
  }
}

export default App;
