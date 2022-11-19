import React from 'react';

import 'antd/dist/antd.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CMSLayout } from 'src/layouts';

import { Navigation } from './constants';
import { RequireAuth } from './hoc/RequireAuth';
import { GamesPage, MainPage, MusicPage } from './pages';
import { AuthPage } from './pages/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthProvider } from './providers/AuthProvider';

import './index.scss';

const rootElement = document.getElementById('app-root');

if (rootElement) {
  const reactRoot = createRoot(rootElement);

  reactRoot.render(
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={Navigation.main}
              element={
                <RequireAuth>
                  <CMSLayout />
                </RequireAuth>
              }
            >
              <Route index element={<MainPage />} />
              <Route path={Navigation.music} element={<MusicPage />} />
              <Route path={Navigation.games} element={<GamesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path={Navigation.auth} element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>,
  );
}
