import React, {useEffect, useState} from 'react';
import {QrCode} from 'lucide-react';
import {userSession} from "../../factory/userSessionFactory.ts";
import {useAuth} from "react-oidc-context";
import {Authentication} from "../../core/AuthenticationProvider/api/data.ts";
import {getAuthentication} from "../../functions.ts";



interface BootstrapComponentProps {
  redirectUser: (destination: string, error?: string) => void;
  onAuthentication: (authentication: Authentication) => void;
}



const BootstrapComponent: React.FC<BootstrapComponentProps> = ({ redirectUser, onAuthentication }) => {
  const [loadingText, setLoadingText] = useState('Initializing...');
  const auth = useAuth();
  useEffect(() => {
    if(auth.isLoading){
      setLoadingText('Loading authentication...');
      return;
    }
    if(auth.isAuthenticated && !auth.isLoading) {
      const authentication: Authentication = getAuthentication(auth.user!)!;
      if(authentication) onAuthentication(authentication);
      setLoadingText('Loading user session...');
      userSession.load(authentication).then((redirection) => {
        redirectUser(redirection.path);
      })
      return;
    }else {
      auth.signinRedirect().catch((error) => {
        console.error("Signin redirect failed:", error);
      });
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.user]);

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