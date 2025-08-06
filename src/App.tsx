import {useState, useCallback, useEffect} from 'react';
import BootstrapComponent from './components/Bootstrap/BootstrapComponent';
import RefreshSessionComponent from './components/RefreshSession/RefreshSessionComponent';
import BottomNavigation from './components/Layout/BottomNavigation';
import Header from './components/Layout/Header';
import PromoListComponent from './components/PromoList/PromoListComponent.tsx';
import Statistics from './components/Statistics/Statistics';
import Settings from './components/Settings/Settings';
import CreatePromoPage from './components/CreatePromo/CreatePromoPage';
import QrcodeScannerView from './components/ScanQrcode/QrcodeScannerView';
import RedeemCouponView from './components/RedeemCoupon/RedeemCouponView.tsx';
import UpgradePlanView from './components/Subscription/UpgradePlanView';
import AddCashierView from './components/AddCashier/AddCashierView.tsx';
import HelpSupportView from './components/HelpSupport/HelpSupportView.tsx';
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';
import CustomersView from './components/Customers/CustomersView.tsx';
import RegionPickerComponentPage from './components/RegionPicker/RegionPickerComponentPage.tsx';
import { CouponData } from './core/ScanQrcode/api/data';
import {Authentication} from "./core/Model/Authentication.ts";
import {
  APP_ROUTE, CREATE_PROMO_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_PAGE_ROUTE,
  REFRESH_SESSION_ROUTE, SET_CONFIG_ROUTE
} from "./core/Common/constants.ts";
import {AuthProvider} from 'react-oidc-context';
import {Config} from "./config.ts";
import {fetchConfig} from "./services/external/fetchConfig.ts";
import {redeemCouponCreator} from "./core/RedeemCoupon/api/RedeemCoupon.ts";
import {cashDrawerApiCreator} from "./services/external/cashDrawerApi.ts";
import {punch_couponCreator} from "./core/RedeemCoupon/rules/CouponPuncher.ts";
import {nativeDateTimeProvider} from "./services/browser/NativeDateTimeProvider.ts";
import {cryptoIdGenerator} from "./services/browser/CryptoIdGenerator.ts";
import {addCashierCreator} from "./core/AddCashier/api/AddCashier.ts";
import {addCashierApiCreator} from "./services/external/addCashierApi.ts";
import {sessionStorageBrowserApi} from "./services/browser/SessionStorageBrowserApi.ts";
import {AppRoute} from "./core/Common/api/CommonTypes.ts";
import {listCashierCreator} from "./core/ListCashiers/api/ListCashiers.ts";
import {cashierListApiCreator} from "./services/external/cashierListApi.ts";
import {createPromoCreator} from "./core/CreatePromo/api/CreatePromo.ts";
import {savePromoApiCreator} from "./services/external/savePromoApi.ts";
import {promoValidatorCreator} from "./core/CreatePromo/rules/PromoValidation.ts";
import {nativeDateProvider} from "./services/browser/NativeDateProvider.ts";
import {getPromoListCreator} from "./core/ListPromos/api/PromoList.ts";
import {getPromoListApiCreator} from "./services/external/getPromoListApi.ts";
import {getPromoStatisticsCreator} from "./core/PromoStatistics/api/PromoStatistics.ts";
import {promoStatisticsApiCreator} from "./services/external/promoStatisticApi.ts";
import {getCheckoutUrlCreator} from "./core/Subscription/api/GetCheckoutUrl.ts";
import {checkoutApiCreator} from "./services/external/checkoutApi.ts";
import {UserProfile} from "./core/UserSession/api/data.ts";
import {loadUserSessionCreator} from "./core/UserSession/api/UserSession.ts";
import {userProfileApiCreator} from "./services/external/userProfileApi.ts";
import {localStorageApi} from "./services/browser/LocalStorageBrowserApi.ts";
import {getUploadUrlCreator, uploadFileCreator} from "./core/UploadImage/api/UploadFile.ts";
import {getUploadUrlApiCreator} from "./services/external/getUploadUrlApi.ts";
import {uploadFileApi} from "./services/external/uploadFileApi.ts";
import {sendHelpSupportMessageCreator} from "./core/HelpSupport Message/api/HelpSupportMessage.ts";
import {helpSupportMessageApi} from "./services/external/helpSupportMessageApi.ts";


const nullConfig = {
    "userPoolId": "",
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
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);


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
        } else {
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

    const onUserProfileLoaded = useCallback((userProfile: UserProfile) => {
        setUserProfile(userProfile);
    }, [])

    const onAuthentication = useCallback((authentication: Authentication) => {
        setAuthentication(authentication);
    }, [])

    // Handle scan success - navigate to redeem coupon
    const handleScanSuccess = (coupon: CouponData) => {
        setScannedCoupon(coupon);
        setAppRoute('redeem-coupon');
    };

    // Handle scan error
    const handleScanError = (error: string) => {
        console.error('Scan error:', error);
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
                return <PromoListComponent
                    redirectUser={redirectUser}
                    getPromoList={
                        getPromoListCreator(
                            getPromoListApiCreator(
                                config.apiEndpoints.shopPromo,
                                authentication!.token
                            ),
                            sessionStorageBrowserApi
                        )
                    }
                />;
            case 'statistics':
                return <Statistics
                    getPromoStatistics={
                        getPromoStatisticsCreator(
                            promoStatisticsApiCreator(
                                config.apiEndpoints.shopPromo,
                                authentication!.token
                            ),
                            sessionStorageBrowserApi
                        )
                    }
                />;
            case 'customers':
                return <CustomersView />;
            case 'scan':
                return (
                    <QrcodeScannerView
                        onScanSuccess={handleScanSuccess}
                        onScanError={handleScanError}
                        isActive={true}
                        onClose={handleScanClose}
                    />
                );
            case 'settings':
                return <Settings
                    redirectUser={redirectUser}
                    listCashiers={
                        listCashierCreator(
                            cashierListApiCreator(config.apiEndpoints.userSide, authentication!.token),
                            sessionStorageBrowserApi
                        )
                    }
                />;
            default:
                return <PromoListComponent
                    redirectUser={redirectUser}
                    getPromoList={
                        getPromoListCreator(
                            getPromoListApiCreator(
                                config.apiEndpoints.shopPromo,
                                authentication!.token
                            ),
                            sessionStorageBrowserApi
                        )
                    }
                />;
        }
    };

    // Main app rendering logic
    switch (appRoute) {

        case APP_ROUTE:
            if(config === nullConfig) {
                return <RegionPickerComponentPage
                    redirectUser={redirectUser}
                    onConfigReceived={onConfigReceived}
                    fetchConfig={fetchConfig}
                />;
            }else {
                return <AuthProvider {...config.cognito}>
                    <BootstrapComponent
                        setUserProfile={onUserProfileLoaded}
                        redirectUser={redirectUser}
                        onAuthentication={onAuthentication}
                        loadUserSession={
                            loadUserSessionCreator(
                                userProfileApiCreator(
                                    config.apiEndpoints.userSide),
                                localStorageApi)
                        }
                    />;
                </AuthProvider>
            }


        case REFRESH_SESSION_ROUTE:
            return <RefreshSessionComponent
                redirectUser={redirectUser}
                onAuthentication={onAuthentication}
            />;

        case CREATE_PROMO_ROUTE:
            return <CreatePromoPage
                uploadFile={uploadFileCreator(uploadFileApi)}
                getUploadUrl={getUploadUrlCreator(getUploadUrlApiCreator(config.apiEndpoints.userSide, authentication!.token), cryptoIdGenerator)}
                redirectUser={redirectUser}
                createPromo={createPromoCreator(
                    savePromoApiCreator(
                        config.apiEndpoints.shopPromo,
                        authentication!.token
                    ),
                    promoValidatorCreator(nativeDateProvider),
                    sessionStorageBrowserApi)}
            />;

    case 'redeem-coupon':
      return (
        <RedeemCouponView
          couponData={scannedCoupon!}
          onComplete={handleRedeemComplete}
          onCancel={handleRedeemCancel}
          redeemCoupon={
          redeemCouponCreator(
              cashDrawerApiCreator(
                  config.apiEndpoints.shopPromo,
                  authentication!.token
              ),
              punch_couponCreator(nativeDateTimeProvider, cryptoIdGenerator)
          )
        }
        />
      );

    case 'upgrade-plan':
      return (
        <UpgradePlanView
            redirectUser={redirectUser}
            userPlan={userProfile!.userPlan}
            getCheckoutUrl={
                getCheckoutUrlCreator(checkoutApiCreator(
                    config.apiEndpoints.userSide,
                    authentication!.token)
                )
            }
        />
      );

    case 'add-cashier':
      return (
        <AddCashierView
          userPoolId={config.userPoolId}
          onComplete={handleAddCashierComplete}
          onCancel={handleAddCashierCancel}
          addCashier={
            addCashierCreator(
                addCashierApiCreator(
                    config.apiEndpoints.shopPromo,
                    authentication!.token
                ),
                sessionStorageBrowserApi,
                cryptoIdGenerator
            )
          }
        />
      );

    case 'help-support':
      return (
        <HelpSupportView
            sendHelpSupportMessage={
            sendHelpSupportMessageCreator(
                helpSupportMessageApi(config.apiEndpoints.userSide)
            )
        }
          onCancel={handleHelpSupportCancel}
        />
      );

    case SET_CONFIG_ROUTE:
      return <RegionPickerComponentPage
          redirectUser={redirectUser}
          onConfigReceived={onConfigReceived}
          fetchConfig={fetchConfig}
      />;

    case ERROR_PAGE_ROUTE:
      return (
        <ErrorPage
          redirectUser={redirectUser}
        />
      );

    case DASHBOARD_ROUTE:
      return (
        <div className="flex flex-col h-screen bg-gray-50">
          <Header
              userProfile={userProfile!}
          />
          <main className="flex-1 overflow-auto pb-20">
            {renderDashboardContent()}
          </main>
          <BottomNavigation
              activeRoute={activeRoute}
              onRouteChange={setActiveRoute}
          />
        </div>
      );

    default:
      // Fallback to region check
      checkConfig();
      return null;
  }
}

export default App;
