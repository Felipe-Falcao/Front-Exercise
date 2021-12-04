import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { AppContextProvider } from './app_context';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AppContextProvider>
      <ToastProvider>{children}</ToastProvider>
    </AppContextProvider>
  </AuthProvider>
);

export default AppProvider;
