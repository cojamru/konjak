import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { navigation } from './constants';
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
          path={navigation.MAIN}
          element={
            <RequireAuth>
              <CMSLayout />
            </RequireAuth>
          }
        >
          <Route index element={<MainPage />} />
          <Route path={navigation.MUSIC} element={<MusicPage />} />
          <Route path={navigation.GAMES} element={<GamesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path={navigation.AUTH} element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};
