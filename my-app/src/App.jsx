import './App.css'
import { supabase } from './services/supabaseClient'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login'
import CreateAcc from './pages/Register'
import Admin from './pages/Admin/Admin'
import Dashboard from './components/admin/Dashboard'
import ListedProduct from './components/admin/ListedProduct'
import Listing from './components/admin/Listing'
import Navbar from './components/navbar/Navbar';
function App() {
  console.log(supabase);
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/admin' && location.pathname !== '/admin/listing' && location.pathname !== '/admin/yourproduct' && location.pathname !== '/admin/dashboard' && (
        <div>
          <Navbar />
        </div>)}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<CreateAcc />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        {/* Nested Routes for Admin Dashboard  */}
        <Route path='/admin/*' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='yourproduct' element={<ListedProduct />} />
          <Route path='listing' element={<Listing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
