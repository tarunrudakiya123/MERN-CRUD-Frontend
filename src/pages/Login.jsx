import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login({ email, password });
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {errors?.length > 0 &&
          errors?.map((error, index) => (
            <Alert key={index} variant="danger">
              {error.message}
            </Alert>
          ))}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <div className="text-center mt-3">
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
