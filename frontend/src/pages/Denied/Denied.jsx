/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./styles.css";

const PaymentError = ({ orderId }) => {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        setOrderNumber(data.orderNumber);
      } catch (error) {
        console.error("Error al obtener detalles del pedido:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div
      style={{
        width: "100%",
        height: "76vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="denied-container">
        <div className="error-icon">&#9888;</div>
        <div className="title">Error en el Pago</div>
        <div className="order-number">ORDEN #{orderNumber}</div>
        <div className="message">
          Lamentablemente, hubo un problema al procesar tu pago. Por favor,
          revisa los detalles de pago e inténtalo nuevamente. Si el problema
          persiste, contacta con nuestro soporte.
        </div>
        <a href="/" className="button">
          Inicio
        </a>
      </div>
    </div>
  );
};

export default PaymentError;
