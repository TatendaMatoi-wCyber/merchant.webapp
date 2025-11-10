import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import TeaserOffer from '../components/TeaserOffer';

function CartPage() {
  const { cartItems, removeFromCart, cartTotal, merchantToken } = useCart();
  const currency = 'USD'; // Assuming USD

  const handlePayment = () => {
    const checkoutUrl = 'https://localhost:7244/Checkout';

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = checkoutUrl;
    form.target = '_blank'; // Open in a new tab

    const fields = {
      Token: merchantToken,
      PrincipalAmount: cartTotal.toFixed(2),
      CurrencyId: currency,
      RedirectUrl: 'http://localhost:3000/order-confirmation',
    };

    for (const key in fields) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = fields[key];
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4"/>
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

              <button
                onClick={handlePayment}
                className="ndasenda-pay-button w-full mt-4"
              >
                Pay With NdasendaPay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;