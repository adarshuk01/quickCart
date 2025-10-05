import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'; 
import { CategoryProvider } from './context/CategoryContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { DiscountProvider } from './context/DiscountContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <CategoryProvider>
      <ProductProvider>
        <DiscountProvider>
    <App />
    </DiscountProvider>
    </ProductProvider>
    </CategoryProvider>
    </BrowserRouter>
  </StrictMode>,
)
