import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProductProvider } from './Context/ProductData.jsx';
import { EditProvider } from './Context/EditListing.jsx';
import { CategoryProvider } from './Context/Category.jsx';
import { CartProvider } from './Context/CartContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <EditProvider>
          <CategoryProvider>
            <CartProvider>
              <App />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
              />
            </CartProvider>
          </CategoryProvider>
        </EditProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
)
