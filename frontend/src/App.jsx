import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Apps from "./pages/Admin/Admin";
import ProductPage from "./pages/Product/Product";
import ProductsPage from "./pages/Products/products";
import Cart from "./pages/Cart/Cart";
import Confirmation from "./pages/Confirmation/Confirmation";
import PaymentError from "./pages/Denied/Denied";
import "./App.css";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Apps />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/:category?" element={<ProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/denied" element={<PaymentError />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
