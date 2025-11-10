import React from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-700 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
