import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import TeaserOffer from '../components/TeaserOffer';
import { initiateCheckoutSession } from '../api';

function CartPage() {
  const { cartItems, removeFromCart, cartTotal, merchantToken } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currency = 'USD'; // Assuming USD

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const redirectUrl = window.location.origin + process.env.PUBLIC_URL + '/order-confirmation';
      const result = await initiateCheckoutSession(cartTotal, currency, merchantToken, redirectUrl);

      if (result && result.checkoutUrl) {
        window.open(result.checkoutUrl, '_blank');
        setLoading(false);
      } else {
        throw new Error("No checkout URL returned from API.");
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);
      setError("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-blue-500">Go shopping</Link></p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                    <div>
                      <h2 className="font-bold">{item.name}</h2>
                      <p>${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-bold mb-2">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <TeaserOffer amount={cartTotal} currency={currency} token={merchantToken} />

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-4 text-xs" role="alert">
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full mt-4 bg-[#005a8c] text-white font-bold py-3 px-4 rounded transition-all duration-200 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#004a73]'
                  }`}
              >
                {loading ? 'Starting Checkout...' : 'Pay With NdasendaPay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;