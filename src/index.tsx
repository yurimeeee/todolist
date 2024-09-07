import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#518EF8' } }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
