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
import Register from "./pages/Register/Register";
import "./App.css";
import Loading from "./pages/Loading/Loading";
function App() {
  return (
    <>
      <Navbar />
      <Loading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Apps />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/:category?" element={<ProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Confirmation />} />
        <Route path="/faliure" element={<PaymentError />} />
      </Routes>
      {/*  */}
      <Footer />
    </>
  );
}

export default App;
