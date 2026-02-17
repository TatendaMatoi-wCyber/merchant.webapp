import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = process.env.PUBLIC_URL + '/ndasenda-button.min.css';
document.head.appendChild(stylesheet);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);