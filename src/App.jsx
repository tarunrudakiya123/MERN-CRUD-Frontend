import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import NavbarComponent from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Container className="mt-4">
        <Routes>
          {/* Public Route----------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes-------*/}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          {/* Default Redirect-----*/}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Toaster />
    </Router>
  );
};

export default App;
