import axios from 'axios';

const API_BASE_URL = 'https://ndasendapay-sandbox-api-bqdrbpfnajh5auhk.eastus-01.azurewebsites.net';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginMerchant = async (email, password) => {
  try {
    const response = await apiClient.post('/api/v1/login', {
      email,
      password,
    });
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const getTeaserOffer = async (amount, currency, token) => {
  try {
    const response = await apiClient.get('/api/v1/checkout/offers/default', {
      params: {
        PrincipalAmount: amount,
        CurrencyId: currency,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch teaser offer:', error);
    throw error;
  }
};

export const initiateCheckoutSession = async (amount, currency, token, redirectUrl) => {
  try {
    const response = await apiClient.post('/api/v1/checkout/session/initiate', {
      PrincipalAmount: amount,
      CurrencyId: currency,
      Token: token,
      RedirectUrl: redirectUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Expecting { checkoutUrl: "..." }
  } catch (error) {
    console.error('Failed to initiate checkout session:', error);
    throw error;
  }
};