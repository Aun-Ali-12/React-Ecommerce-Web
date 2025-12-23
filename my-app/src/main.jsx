import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProductProvider } from './Context/ProductData.jsx';
import { EditProvider } from './Context/EditListing.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <EditProvider>
        <App />
        </EditProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
)
