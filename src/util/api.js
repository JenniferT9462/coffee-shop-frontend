import api from './axiosInstance';

// Authentication
export const registerUser = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('authToken', data.token); // Save token to localStorage
    return data;
  };
  
  export const loginUser = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('authToken', data.token); // Save token to localStorage
    return data;
  };

// Products
// export const fetchProducts = (params) => api.get('/products', { params });
// export const fetchProduct = (id) => api.get(`/products/${id}`);
// export const createProduct = (productData) => api.post('/products', productData);
// export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
// export const deleteProduct = (id) => api.delete(`/products/${id}`);