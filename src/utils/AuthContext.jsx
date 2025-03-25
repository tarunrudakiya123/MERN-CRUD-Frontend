import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const AuthContext = createContext();

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await API.get("/auth/check");
        setUser(data?.user);
        setLoading(false);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await API.post("/auth/login", credentials);

      if (response?.data.status === false) {
        toast.error(response?.data.message);
      } else {
        setUser(response.data.user);
        toast.success(response?.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    const response = await API.post("/auth/logout");
    if (response?.data.status == false) {
      toast.error(response?.data.message);
    } else {
      toast.success(response?.data.message);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
