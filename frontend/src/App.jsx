import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import ProductPage from "./pages/Product/Product";
import ProductsPage from "./pages/products/products";
import Cart from "./pages/Cart/Cart";
import Confirmation from "./pages/Confirmation/Confirmation";
import PaymentError from "./pages/Denied/Denied";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/Denied" element={<PaymentError />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
