import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Importa el archivo CSS

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error al obtener el producto:', error));
  }, [id]);

  const addToCart = () => {
    const userId = '123'; // Reemplaza con el ID del usuario logueado
    axios.post('http://localhost:5000/api/cart/add', { userId, productId: id, quantity: 1 })
      .then(response => alert('Producto agregado al carrito'))
      .catch(error => console.error('Error al agregar al carrito:', error));
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>Price : ${product.price}</p>
        <p>Description:</p>
        <p>{product.description}</p>
        <button className="add-to-cart-button" onClick={addToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductDetail;