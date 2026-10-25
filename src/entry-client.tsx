import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { findPage } from './routes';
import './site.css';

const { page, lang } = findPage(window.location.pathname);
hydrateRoot(document.getElementById('root')!, <App page={page} lang={lang} />);
