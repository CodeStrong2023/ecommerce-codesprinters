/* eslint-disable no-unused-vars */
// src/components/CheckoutButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializa el SDK de Mercado Pago con tu Public Key
initMercadoPago('TU_PUBLIC_KEY');

function CheckoutButton({ preferenceId }) {
    return <Wallet initialization={{ preferenceId }} />;
}

// Validación de props
CheckoutButton.propTypes = {
    preferenceId: PropTypes.string.isRequired,
};

export default CheckoutButton;
