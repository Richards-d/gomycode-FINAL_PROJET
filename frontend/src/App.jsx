import React from "react";
import Navbar from "./Components/Navbar/Navbar"
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart"
import LoginSignup from "./Pages/LoginSignup"
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Shop/>} />
        <Route path="/clothes" element={<ShopCategory category="clothes"/>} />
        <Route path="/pants" element={<ShopCategory category="pants"/>} />
        <Route path="/accessory" element={<ShopCategory category="accessory"/>} />
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<LoginSignup/>} />
      </Routes>

      <Footer/>
      </BrowserRouter>
      
    </div>
    
  );
};

export default App;
