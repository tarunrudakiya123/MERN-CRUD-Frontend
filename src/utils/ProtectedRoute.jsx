import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import API from "../api/api";

// Protected Route Component-------
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await API.get("/auth/check");
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication", error);
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
