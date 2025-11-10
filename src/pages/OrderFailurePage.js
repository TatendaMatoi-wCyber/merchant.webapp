import React from 'react';
import { Link } from 'react-router-dom';

function OrderFailurePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Order Failed!</h1>
        <p className="text-lg text-gray-700 mb-6">Unfortunately, your order could not be processed. Please try again or contact support.</p>
        <Link to="/cart" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg">Back to Cart</Link>
      </div>
    </div>
  );
}

export default OrderFailurePage;
