import axios from 'axios';

const API_BASE_URL = 'https://localhost:7284/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginMerchant = async (email, password) => {
  try {
    const response = await apiClient.post('/login', {
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
    const response = await apiClient.get('/checkout/offers/default', {
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