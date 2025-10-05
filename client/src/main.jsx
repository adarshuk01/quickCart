import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename='/'>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
    <App />
    </CartProvider>
    </ProductProvider>
    </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
