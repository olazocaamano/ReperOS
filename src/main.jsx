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