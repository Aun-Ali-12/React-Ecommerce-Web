import './App.css'
import { supabase } from './services/supabaseClient'
import { Route, Routes, useLocation  } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login'
import CreateAcc from './pages/Register'
import Navbar from './components/navbar/Navbar';

function App() {
  console.log(supabase);
  const location = useLocation()  
  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/signup' &&(
        <div>
          <Navbar />
        </div>)}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<CreateAcc />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
