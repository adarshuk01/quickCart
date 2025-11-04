import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Layout from './layout/Layout';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Coupons from './pages/Coupons';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Orders from './pages/Orders';

function App() {
  return (
  
      <div>
     
          <Routes>
            <Route  element={<Layout/>}>
            <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<DashBoard/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/customers" element={<div>Customers</div>} />
            <Route path="/reports" element={<div>Reports</div>} />
            <Route path="/coupons" element={<Coupons/>} />
            <Route path="/inbox" element={<div>Inbox</div>} />
            <Route path="/knowledge-base" element={<div>Knowledge Base</div>} />
            <Route path="/product-updates" element={<div>Product Updates</div>} />
            <Route path="/personal-settings" element={<div>Personal Settings</div>} />
            <Route path="/global-settings" element={<div>Global Settings</div>} />
            </Route>
            </Route>
            <Route path='/login'element={<Login/>} />
          </Routes>
      </div>
  );
}

export default App;
