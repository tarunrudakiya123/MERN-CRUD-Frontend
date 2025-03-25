import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/api";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Pagination,
} from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const [errors, setErrors] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [page]);

  //Get Products  Handler============

  const loadProducts = async () => {
    try {
      const data = await fetchProducts(page, 5);
      setProducts(data?.products);
      setTotalPages(data.pages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
      setErrors([{ message: "Failed to load products" }]);
    }
  };

  const handleShow = (product = null) => {
    if (product) {
      setProductData(product);
      setEditMode(true);
      setSelectedProduct(product?._id);
    } else {
      setProductData({ name: "", description: "", price: 0 });
      setEditMode(false);
    }
    setErrors([]);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  //Create & Edit  Handler============

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!productData.name || !productData.description || !productData.price) {
        setErrors([{ message: "All fields are required" }]);
        return;
      }
      const payload = { ...productData, price: Number(productData?.price) };

      if (editMode && selectedProduct) {
        await updateProduct(selectedProduct, payload);
      } else {
        await createProduct(payload);
      }
      handleClose();
      loadProducts();
    } catch (err) {
      setErrors([{ message: err }]);
    }
  };

  //Delete Handler============

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (err) {
        console.error(err);
        setErrors([{ message: "Error deleting product" }]);
      }
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <h3>Product Management</h3>
        <Button
          className="mt-2"
          variant="outline-primary"
          onClick={() => handleShow()}
        >
          Add Product
        </Button>
      </div>

      <Table striped bordered border={"1px solid #ccc"} hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products?.map((p) => (
              <tr key={p?._id}>
                <td>{p?.name}</td>
                <td>{p?.description}</td>
                <td>${p?.price}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShow(p)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(p?._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Pagination----------- */}
      {totalPages > 1 && (
        <Pagination>
          {[...Array(totalPages).keys()].map((num) => (
            <Pagination.Item
              key={num + 1}
              active={num + 1 === page}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      {/*------------Product Modal-----------*/}
      {showModal && (
        <>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editMode ? "Edit Product" : "Add Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* error Show==== */}
              {errors?.length > 0 &&
                errors?.map((error, index) => (
                  <Alert key={index} variant="danger">
                    {error?.message}
                  </Alert>
                ))}

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={productData?.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={productData?.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={Number(productData?.price)}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="mt-2">
                  {editMode ? "Update Product" : "Add Product"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Products;
