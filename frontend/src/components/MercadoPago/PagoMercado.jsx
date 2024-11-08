/* eslint-disable no-unused-vars */
// src/components/PagoMercado.jsx
import React, { useState } from 'react';
import CheckoutButton from '../CheckoutButton/CheckoutButton'; // Asegúrate de que CheckoutButton esté disponible en tu proyecto o crea este componente si es necesario.

function PagoMercado() {
    const [preferenceId, setPreferenceId] = useState(null);

    const generarPago = async () => {
        const response = await fetch('/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Producto X',
                price: 100,
                quantity: 1,
            }),
        });
        const data = await response.json();
        setPreferenceId(data.id);
    };

    return (
        <div>
            <button onClick={generarPago}>Pagar con Mercado Pago</button>
            {preferenceId && <CheckoutButton preferenceId={preferenceId} />}
        </div>
    );
}

export default PagoMercado;
