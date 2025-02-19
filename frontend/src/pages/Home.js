import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  const addToCart = (productId) => {
    const userId = '123'; // Reemplaza con el ID del usuario logueado
    axios.post('http://localhost:5000/api/cart/add', { userId, productId, quantity: 1 })
      .then(response => alert('Producto agregado al carrito'))
      .catch(error => console.error('Error al agregar al carrito:', error));
  };

  return (
    <div>
      <h2>Productos</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </Link>
              <button onClick={() => addToCart(product._id)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Home;