const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product'); // Asegúrate de que la ruta sea correcta

const products = [
  {
    name: 'T-shirt',
    description: 'oversized T-shirt',
    price: 100,
    image: 'https://au.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-502867_1080x.jpg?v=1671085654E'
  },
  {
    name: 'Product 2',
    description: 'Description for product 2',
    price: 200,
    image: 'https://via.placeholder.com/150'
  },
  // Agrega más productos según sea necesario
];

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('Conectado a MongoDB');
    return Product.deleteMany({});
  })
  .then(() => {
    console.log('Productos previos eliminados');
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Datos de prueba insertados');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error al insertar datos de prueba:', err);
    mongoose.connection.close();
  });