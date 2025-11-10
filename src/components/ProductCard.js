import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4"/>
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
