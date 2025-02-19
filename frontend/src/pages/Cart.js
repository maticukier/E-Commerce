import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Asegúrate de tener un archivo CSS para estilos específicos de Cart

function Cart({ onClose }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const userId = '123'; // Reemplaza con el ID del usuario logueado
    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then(response => setCart(response.data))
      .catch(error => console.error('Error al obtener el carrito:', error));
  }, []);

  if (!cart) return <div>Cargando...</div>;

  return (
    <div className="cart-overlay">
      <div className="cart-popup">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Carrito</h2>
        {cart.products.map(item => (
          <div key={item.productId._id} className="cart-item">
            <h3>{item.productId.name}</h3>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.productId.price * item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;