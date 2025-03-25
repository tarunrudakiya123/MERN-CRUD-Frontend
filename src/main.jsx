import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./utils/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
);
