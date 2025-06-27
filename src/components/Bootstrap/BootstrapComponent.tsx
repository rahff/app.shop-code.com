import React, {useEffect, useState} from 'react';
import {QrCode} from 'lucide-react';
import {AuthenticationProvider} from "../../core/AuthenticationProvider/api/AuthenticationProvider.ts";
import {local_storage} from "../../services/browser/LocalStorageBrowserApi.ts";
import {oidc_service} from "../../services/external/OIDCService.ts";
import {UserSession} from "../../core/UserSession/api/UserSession.ts";
import {user_profile_api} from "../../services/external/HttpUserProfileApi.ts";

interface BootstrapComponentProps {
  onBootstrapComplete: (destination: string, error?: string) => void;
}
const authentication_provider = new AuthenticationProvider(local_storage, oidc_service);
const user_session = new UserSession(local_storage, user_profile_api);
const BootstrapComponent: React.FC<BootstrapComponentProps> = ({ onBootstrapComplete }) => {
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {

    const initializeApp = () => {
      setLoadingText('Loading authentication...');
      return authentication_provider.auto_login().subscribe(async () => {
        setLoadingText('Loading user session...');
        user_session.load().then((redirection) => {
          onBootstrapComplete(redirection.path);
        })
      });
    };

    const subscription = initializeApp();
    return () => {
      subscription.unsubscribe();
    };
  }, [onBootstrapComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] to-[#5845E9] flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
            <QrCode className="w-12 h-12 text-[#6C63FF]" />
          </div>
          <h1 className="text-4xl font-bold text-white font-['Inter'] mb-2">Shop-Code</h1>
          <p className="text-white/80 text-lg">Dashboard</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
          <p className="text-white/90 text-lg font-medium">{loadingText}</p>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse" style={{ 
              animation: 'progress 2s ease-in-out infinite',
              width: '60%'
            }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BootstrapComponent;