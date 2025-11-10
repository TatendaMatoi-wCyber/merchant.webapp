import React from 'react';
import { useCart } from '../context/CartContext';
import TeaserOffer from '../components/TeaserOffer';

function CheckoutPage() {
  const { cartTotal, merchantToken } = useCart();
  const currency = 'USD'; // Assuming USD for now, this could be dynamic in a real app

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <p className="text-lg font-semibold">Order Total: ${cartTotal.toFixed(2)}</p>
        </div>

        <TeaserOffer amount={cartTotal} currency={currency} token={merchantToken} />

        <div
          className="ndasenda-pay-button mt-6"
          data-principal-amount={cartTotal}
          data-currency-id={currency}
          data-merchant-token={merchantToken}
          data-redirect-url="http://localhost:3000/order-confirmation"
        >
          {/* This will be replaced by the Ndasenda script */}
          Pay with Ndasenda
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
