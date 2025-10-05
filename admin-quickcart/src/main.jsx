import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext.jsx'
import { CategoryProvider } from './context/CategoryContext.jsx'
import { DiscountProvider } from './context/DiscountContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProductProvider>
      <CategoryProvider>
        <DiscountProvider>
          <AuthProvider>
    <App />
    </AuthProvider>
    </DiscountProvider>
    </CategoryProvider>
    </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
