import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import CreateAcc from './pages/Register';
import Admin from './pages/Admin/Admin';
import Dashboard from './components/admin/Dashboard';
import ListedProduct from './components/admin/ListedProduct';
import Listing from './components/admin/Listing';
import Navbar from './components/Navbar/Navbar';
import CategoryProducts from './pages/CategoryProducts'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Result from './pages/Result';
import Contact from './pages/Contact';
import MobileNav from './components/Navbar/MobileNav';

function App() {
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/admin' && location.pathname !== '/admin/listing' && location.pathname !== '/admin/yourproduct' && location.pathname !== '/admin/dashboard' && (
        <div className='hidden md:block sticky top-0 z-50'>
          <Navbar />
        </div>)}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<CreateAcc />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Product />} />
        <Route path='/category/:slug' element={<CategoryProducts />} />
        <Route path='/products/:id' element={<ProductDetail />}></Route>
        <Route path='/category/:slug/:id' element={<ProductDetail />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/search' element={<Result />} ></Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        {/* Nested Routes for Admin Dashboard  */}
        <Route path='/admin/*' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='yourproduct' element={<ListedProduct />} />
          <Route path='listing' element={<Listing />} />
        </Route>
      </Routes>

      <div className='block sticky top-0 z-50 md:hidden'>
        <MobileNav />
      </div>
    </>
  )
}

export default App
