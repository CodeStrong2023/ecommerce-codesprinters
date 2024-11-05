import { Link } from "react-router-dom";
import "./styles.css";
const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">LOGO</div>
      <ul className="navbar-hrefs">
        <button className="navbar-item">Inicio</button>
        <button className="navbar-item">Productos</button>
        <button className="navbar-item">Contacto</button>
      </ul>
      <div className="navbar-user">
        <Link to="/login">Log</Link>
        <Link to="/register">Reg</Link>
        <Link to="/cart">Car</Link>
      </div>
    </nav>
  );
};

export default Navbar;
