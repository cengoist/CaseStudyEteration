import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io/',
});

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};
