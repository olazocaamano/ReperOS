document.title = "ReperOS";

import favicon from './assets/favicon.png';

const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
link.rel = 'icon';
link.href = favicon;
document.getElementsByTagName('head')[0].appendChild(link);

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RepertoireProvider } from './context/RepertoireContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RepertoireProvider> 
      <App />
    </RepertoireProvider>
  </React.StrictMode>,
)