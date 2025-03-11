import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importa CSS di Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa JS di Bootstrap (per componenti interattivi come dropdown, modali, ecc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importa stili personalizzati (da creare)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)