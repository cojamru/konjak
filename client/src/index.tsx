import React from 'react';

import 'antd/dist/antd.css';
import './index.scss';

import { createRoot } from 'react-dom/client';

import Layout from './layouts/CMSLayout/CMSLayout';

const rootElement = document.getElementById('app-root');

if (rootElement) {
  const reactRoot = createRoot(rootElement);

  reactRoot.render(
    <React.StrictMode>
      <Layout>
        <div>fwefew suka</div>
      </Layout>
    </React.StrictMode>,
  );
}
