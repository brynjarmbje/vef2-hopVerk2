'use client';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loadingsvg from '@/components/Loadingsvg';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loadingsvg />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
