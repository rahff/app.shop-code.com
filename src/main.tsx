import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import './i18n';
import App from './App.tsx';
import './index.css';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_4sYZgkGwV",
  client_id: "672adatjjqeolfdkpljt49g4qt",
  redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "email openid profile",
  silent_renew: true
};

createRoot(document.getElementById('root')!).render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);