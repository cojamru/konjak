import React from 'react';

import 'antd/dist/reset.css';

import { createRoot } from 'react-dom/client';

import { App } from './App';
import { AuthProvider } from './providers/AuthProvider';

import './index.scss';

const rootElement = document.getElementById('app-root');

if (rootElement) {
  const reactRoot = createRoot(rootElement);

  reactRoot.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
}
