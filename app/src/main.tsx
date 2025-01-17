import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store/store';
import { Loading } from '@/components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop={true} // Muestra los toasts más recientes al principio
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          autoClose={3000}
        />
        <Loading />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
