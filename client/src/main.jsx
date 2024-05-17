import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DatosProvider } from './context/context.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  <DatosProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DatosProvider>

)
