import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navigation } from './constants';
import { RequireAuth } from './hoc';
import { CMSLayout } from './layouts';
import { GamesPage, MainPage, MusicPage } from './pages';
import { AuthPage } from './pages/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const AppRouter = () => {
  return (
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
  );
};
