import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { navigation } from './constants';
import { RequireAuth } from './hoc';
import { CMSLayout } from './layouts';
import { GamesPage, MainPage, AlbumsPage } from './pages';
import { AlbumEditPage } from './pages/AlbumsEditPage';
import { AuthPage } from './pages/AuthPage';
import { GameEditPage } from './pages/GameEditPage';
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
          <Route path={navigation.MUSIC} element={<AlbumsPage />} />
          <Route path={navigation.MUSIC_ADD} element={<AlbumEditPage />} />
          <Route path={navigation.MUSIC_EDIT} element={<AlbumEditPage />} />
          <Route path={navigation.GAMES} element={<GamesPage />} />
          <Route path={navigation.GAMES_ADD} element={<GameEditPage />} />
          <Route path={navigation.GAMES_EDIT} element={<GameEditPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path={navigation.AUTH} element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};
