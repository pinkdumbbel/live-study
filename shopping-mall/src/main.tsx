import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import './scss/index.scss';
import { worker } from './mocks/browser';

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
