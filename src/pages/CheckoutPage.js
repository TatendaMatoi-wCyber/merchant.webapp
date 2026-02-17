import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import TeaserOffer from '../components/TeaserOffer';
import { initiateCheckoutSession } from '../api';

function CheckoutPage() {
  const { cartTotal, merchantToken } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currency = 'USD'; // Assuming USD for now, this could be dynamic in a real app

  const handlePayWithNdasenda = async () => {
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
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <p className="text-lg font-semibold">Order Total: ${cartTotal.toFixed(2)}</p>
        </div>

        <TeaserOffer amount={cartTotal} currency={currency} token={merchantToken} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <button
          onClick={handlePayWithNdasenda}
          disabled={loading}
          className={`w-full mt-6 bg-[#005a8c] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#004a73]'
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Starting Checkout...
            </>
          ) : (
            'Pay with Ndasenda'
          )}
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
