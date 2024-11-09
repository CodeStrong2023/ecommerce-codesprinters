/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { updateProducto } from "../../utils/api";
const Confirmation = ({ orderId }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const params = useLocation();
  /*   ?collection_id=92503962029&
  collection_status=approved
  &payment_id=92503962029&
  status=approved&
  external_reference=null&
  payment_type=credit_card&
  merchant_order_id=24779889695&
  preference_id=2083974841-d6ea3a92-5ec0-41a5-a1b7-90f6034aefa2&
  site_id=MLA&
  processing_mode=aggregator&
  merchant_account_id=null */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const collectionStatus = queryParams.get("status");
    const handleApprovedPayment = async (ids) => {
      localStorage.removeItem("cart");
      ids.forEach(async (id) => {
        const response = await updateProducto(id, { estado: "vendido" }).then(
          (response) => {
            console.log(response);
          }
        );
      });
    };
    if (collectionStatus === "approved") {
      //ids=2,1
      const itemsIds = queryParams.get("ids").split(",");
      handleApprovedPayment(itemsIds);
    }
    const fetchOrderDetails = async () => {};
    console.log(params);
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
