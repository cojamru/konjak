import React from 'react';

import 'antd/dist/antd.css';
import './index.scss';

import { createRoot } from 'react-dom/client';

import { CMSLayout } from './layouts/CMSLayout/CMSLayout';

const rootElement = document.getElementById('app-root');

if (rootElement) {
  const reactRoot = createRoot(rootElement);

  reactRoot.render(
    <React.StrictMode>
      <CMSLayout>
        <div>content</div>
      </CMSLayout>
    </React.StrictMode>,
  );
}
