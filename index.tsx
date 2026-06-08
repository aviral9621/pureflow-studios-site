import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Always open the site from the top (the hero) instead of letting the browser
// restore the previous scroll position (which could land visitors mid-page on
// the Work section after a reload). The app handles its own scroll-to-top.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);