import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
