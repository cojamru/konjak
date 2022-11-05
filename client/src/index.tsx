import React from 'react';

import './index.scss';

import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('app-root');

if (rootElement) {
  const reactRoot = createRoot(rootElement);

  reactRoot.render(<React.StrictMode>Hello world!</React.StrictMode>);
}
