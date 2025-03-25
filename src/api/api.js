import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Error handler------------------

const handleRequest = async (requestFunction) => {
  try {
    const response = await requestFunction();
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Something went wrong";
  }
};

// Auth Endpoints-----------------

export const registerUser = (userData) =>
  handleRequest(() => API.post("/auth/register", userData));
export const loginUser = (userData) =>
  handleRequest(() => API.post("/auth/login", userData));
export const logoutUser = () => handleRequest(() => API.post("/auth/logout"));
export const checkAuth = () => handleRequest(() => API.get("/auth/check"));

// Product Endpoints----------------

export const fetchProducts = (page = 1, limit) =>
  handleRequest(() => API.get(`/products?page=${page}&limit=${limit}`));

export const createProduct = (productData) =>
  handleRequest(() => API.post("/products", productData));

export const updateProduct = (id, productData) =>
  handleRequest(() => API.put(`/products/${id}`, productData));
export const deleteProduct = (id) =>
  handleRequest(() => API.delete(`/products/${id}`));

export default API;
