import "./styles.css";
import { useNavigate } from "react-router-dom";
import MenuList from "../MenuList/MenuList";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">LOGO</div>
      <ul className="navbar-hrefs">
        <button className="navbar-item" onClick={() => navigate("/")}>
          Inicio
        </button>
        <button className="navbar-item" onClick={() => navigate("/products")}>
          Productos
        </button>
        <button className="navbar-item" onClick={() => navigate("/contact")}>
          Contacto
        </button>
      </ul>
      <div className="navbar-user">
        <MenuList />
      </div>
    </nav>
  );
};

export default Navbar;
