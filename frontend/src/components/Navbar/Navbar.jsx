import "./styles.css";
import { useNavigate } from "react-router-dom";
import MenuList from "../MenuList/MenuList";
import { signout } from "../../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signout();
    console.log("saliendo");
    /* navigate("/"); */
  };
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
        <button className="navbar-item" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
        <button className="navbar-item" onClick={handleLogout}>
          Cerrar sesión
        </button>
        <button className="navbar-item" onClick={() => navigate("/register")}>
          Registrarse
        </button>
        <button className="navbar-item" onClick={() => navigate("/cart")}>
          Carrito
        </button>
      </ul>
      <div className="navbar-user">
        <MenuList />
      </div>
    </nav>
  );
};

export default Navbar;
