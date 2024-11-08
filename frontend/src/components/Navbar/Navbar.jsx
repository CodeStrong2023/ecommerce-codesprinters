import "./styles.css";
import { useNavigate } from "react-router-dom";
import MenuList from "../MenuList/MenuList";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">LOGO</div>
      <ul className="navbar-hrefs">
        <li>
          <button className="navbar-item" onClick={() => navigate("/")}>
            Inicio
          </button>
        </li>
        <li>
          <button className="navbar-item" onClick={() => navigate("/products")}>
            Productos
          </button>
        </li>
        <li>
          <button className="navbar-item" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
        </li>
        <li>
          <button className="navbar-item" onClick={() => navigate("/register")}>
            Registrarse
          </button>
        </li>
        <li>
          <button className="usuario">
            <span className="span">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 21" height="21" width="23" className="svg-icon">
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="white" d="M1.97742 19.7776C4.45061 17.1544 7.80838 15.5423 11.5068 15.5423C15.2053 15.5423 18.5631 17.1544 21.0362 19.7776M16.2715 6.54229C16.2715 9.17377 14.1383 11.307 11.5068 11.307C8.87535 11.307 6.74212 9.17377 6.74212 6.54229C6.74212 3.91082 8.87535 1.77759 11.5068 1.77759C14.1383 1.77759 16.2715 3.91082 16.2715 6.54229Z" />
              </svg>
            </span>
            <span className="label">Usuario</span>
          </button>
        </li>
        <li>
          <button className="cart" onClick={() => navigate("/cart")}>
            <svg className="cartIcon" viewBox="0 0 576 512">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </button>
        </li>
      </ul>
      <div className="navbar-user">
        <MenuList />
      </div>
    </nav>
  );
};

export default Navbar;

