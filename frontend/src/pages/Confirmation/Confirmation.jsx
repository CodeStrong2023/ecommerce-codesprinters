/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./styles.css";

const Confirmation = ({ orderId }) => {
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
        minHeight: "76vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="confirm-container">
        <div className="confirmation-icon">&#10003;</div>
        <div className="title">Pago Confirmado</div>
        <div className="order-number">ORDEN #{orderNumber}</div>
        <div className="message">
          ¡Gracias por tu compra! Tu pedido ha sido confirmado exitosamente y
          estará listo para el envío en breve. ¡Apreciamos tu apoyo!
        </div>
        <a href="/" className="button">
          Inicio
        </a>
      </div>
    </div>
  );
};

export default Confirmation;
