import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import CreateAcc from './pages/Register';
import AdminPanel from './pages/Admin/Admin'
import Dashboard from './components/admin/pages/Dashboard';
import ListedProduct from './components/admin/components/ListedProduct';
import Listing from './components/admin/pages/Listing';
import Orders from './components/admin/pages/Orders'
import Navbar from './components/Navbar/Navbar';
import CategoryProducts from './pages/CategoryProducts'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Result from './pages/Result';
import Contact from './pages/Contact';
import MobileNav from './components/Navbar/MobileNav';
import AdminGuard from './components/admin/AdminGuard';
import Footer from './components/Footer.jsx'


function App() {
  const location = useLocation()
  const excludedLoc = ['/login', '/signup', '/admin', '/admin/', '/admin/dashboard', '/admin/listing', '/admin/orders', '/admin/yourproduct']
  const hideNav = excludedLoc.includes(location.pathname)
  return (
    <>
      {/* Web nav bar */}
      {!hideNav && (
        <div className='hidden md:block sticky top-0 z-50'>
          <Navbar />
        </div>
      )
      }

      {/* Routes for Website  */}
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
        <Route path='/admin/*' element={<AdminPanel />}>
          <Route path='dashboard' element={
            // Auth Check 
            <AdminGuard>
              <Dashboard />
            </AdminGuard>
          } />
          <Route path='yourproduct' element={
            // Auth Check
            <AdminGuard>
              <ListedProduct />
            </AdminGuard>
          } />
          <Route path='listing' element={
            // Auth Check
            <AdminGuard>
              <Listing />
            </AdminGuard>
          } />
          <Route path='orders' element={
            // Auth Check
            <AdminGuard>
              <Orders />
            </AdminGuard>
          } />
        </Route>
      </Routes>

      {/* Web Mobile navbar  */}
      {!hideNav && (
        <div className='block sticky top-0 z-50 md:hidden'>
          <MobileNav />
        </div>
      )
      }

      <Footer />
    </>
  )
}

export default App
