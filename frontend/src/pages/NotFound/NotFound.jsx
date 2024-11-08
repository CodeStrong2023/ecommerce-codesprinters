import { Link } from "react-router-dom";
import { Card } from "antd";
import "./styles.css";

function NotFound() {
  return (
    <div className="login-container">
      <Card className="error-page-container">
        <h1 className="error-page-title">Página no encontrada</h1>
        <p className="error-page-description">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Link to="/">
          <button className="error-button">Volver al inicio</button>
        </Link>
      </Card>
    </div>
  );
}

export default NotFound;
