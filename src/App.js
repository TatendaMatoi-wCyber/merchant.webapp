import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderFailurePage from './pages/OrderFailurePage';
import { loginMerchant } from './api';

function App() {
  const [merchantToken, setMerchantToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const authenticateMerchant = async () => {
      try {
        const { accessToken, refreshToken } = await loginMerchant('farm@email.com', 'mmmmmmmm');
        setMerchantToken(accessToken);
        setRefreshToken(refreshToken);
      } catch (error) {
        console.error('Failed to authenticate merchant:', error);
      }
    };

    authenticateMerchant();
  }, []);

  return (
    <CartProvider merchantToken={merchantToken}>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/order-failure" element={<OrderFailurePage />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;