import React from 'react';
import { QrCode, Mail, ArrowRight } from 'lucide-react';

interface LoginComponentProps {
  errorMessage?: string;
  onLoginSuccess: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ errorMessage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] to-[#5845E9] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <QrCode className="w-8 h-8 text-[#6C63FF]" />
          </div>
          <h1 className="text-3xl font-bold text-white font-['Inter'] mb-2">Welcome Back</h1>
          <p className="text-white/80">Choose your preferred sign-in method</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
            <p className="text-red-100 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        {/* Authentication Buttons */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-4">
            {/* Login with Email Button */}
            <a
              href="/auth/email"
              className="w-full bg-white text-[#6C63FF] py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <Mail className="w-5 h-5" />
              <span>Login with Email</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            {/* Login with Google Button */}
            <a
              href="/auth/google"
              className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-white hover:text-[#6C63FF] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Login with Google</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-white/60 text-sm">
              Secure authentication powered by AWS Cognito
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-white hover:text-white/80 font-medium transition-colors duration-200">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;