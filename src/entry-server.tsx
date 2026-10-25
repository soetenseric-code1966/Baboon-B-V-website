import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { PageName, Lang } from './routes';

export function render(page: PageName, lang: Lang) {
  return renderToString(<App page={page} lang={lang} />);
}

export { PAGES, TITLES, DESCRIPTION } from './routes';
