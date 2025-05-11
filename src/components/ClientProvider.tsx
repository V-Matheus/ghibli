'use client';

import { store } from '@/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';

export function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}

      <ToastContainer
        autoClose={3000}
        position="bottom-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Provider>
  );
}
