import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../products';
import { CartContext } from '../context/CartContext';

function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg"/>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
        <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
