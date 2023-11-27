/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { Main } from './pages/Main/Loadable';
import { Board } from './pages/Board/Loadable';
import { Calendar } from './pages/Calendar/Loadable';
import { Game } from './pages/Game/Loadable';
import { useTranslation } from 'react-i18next';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet
        titleTemplate="GamzaLand"
        defaultTitle="GamzaLand"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="gamzaland" />
      </Helmet>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="board" element={<Board />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="game" element={<Game />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
