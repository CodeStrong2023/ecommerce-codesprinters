import "./styles.css";
const Home = () => {
  return (
    <div>
      <div className="home-banner">
        <img className="home-img" src="home/paleta.jpg" alt="Arte"></img>
        <div className="text-overlay">
          <h1 className="home-title">ECOMMERCE ARTE</h1>
          <p className="home-desc">
            ¡Bienvenido a Ecommerce Arte! Aquí encontrarás una gran variedad de
            productos artísticos, desde pinturas hasta esculturas. ¡No dudes en
            contactarnos si tienes alguna duda!
          </p>
        </div>
      </div>
      <h2 className="home-subtitle">Productos destacados</h2>
      <div className="product-list">
        <div className="product-item">
          <img className="product-img" src="home/pintura.jpg"></img>
          <h2 className="product-title">Pintura</h2>
          <p className="product-desc">
            ¡Descubre nuestra colección de pinturas! Desde óleos hasta
            acuarelas, ¡tenemos todo lo que necesitas!
          </p>
          <button className="product-button">Ver más</button>
        </div>
        <div className="product-item">
          <img className="product-img" src="home/escultura.jpg"></img>
          <h2 className="product-title">Escultura</h2>
          <p className="product-desc">
            ¡Descubre nuestra colección de esculturas! Desde mármol hasta
            bronce, ¡tenemos todo lo que necesitas!
          </p>
          <button className="product-button">Ver más</button>
        </div>
        <div className="product-item">
          <img className="product-img" src="home/tejidos.jpg"></img>
          <h2 className="product-title">Tejidos</h2>
          <p className="product-desc">
            ¡Descubre nuestra colección de tejidos! Desde lana hasta algodón,
            ¡tenemos todo lo que necesitas!
          </p>
          <button className="product-button">Ver más</button>
        </div>
      </div>
      <div className="advantages-section">
        <h2 className="advantages-title">¿Por qué elegir Ecommerce Arte?</h2>
        <div className="advantages-container">
          <div className="advantage-item">
            <h3 className="advantage-subtitle">Para Usuarios</h3>
            <ul className="advantage-list">
              <li>Amplia variedad de productos artísticos.</li>
              <li>Experiencia de compra fácil e intuitiva.</li>
              <li>Apoya a artistas locales.</li>
              <li>Métodos de pago seguros y confiables.</li>
              <li>Acceso a obras únicas y exclusivas.</li>
            </ul>
          </div>
          <div className="advantage-item">
            <h3 className="advantage-subtitle">Para la Comunidad de Arte</h3>
            <ul className="advantage-list">
              <li>Mayor visibilidad para artistas locales.</li>
              <li>Plataforma para vender sus obras fácilmente.</li>
              <li>Conexión directa con compradores.</li>
              <li>Promoción de la escena artística local.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
