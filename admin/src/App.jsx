import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AdminLayout from './layout/AdminLayout'
import Category from './pages/Category'
import 'antd/dist/reset.css';
import { message } from 'antd';
import Product from './pages/Product'
import AdminLogin from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Offer from './pages/Offer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Routes>
       <Route path='/admin/login' element={<AdminLogin/>}/>
               <Route element={<ProtectedRoute />}>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='category' element={<Category/>}/>
        <Route path='products' element={<Product/>}/>
        <Route path='offers' element={<Offer/>}/>

</Route>
      </Route>
    </Routes>
      
    </>
  )
}

export default App
