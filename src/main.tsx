import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import App from './App.tsx';
import './index.css';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_5VXLUjgXF",
  client_id: "1glc01vnsrcr0g4gi4evm8eive",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "email openid profile",
};

createRoot(document.getElementById('root')!).render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);