// src/components/ProductList.js

import { useState, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9; // Use a reasonable limit for the frontend display

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]); // Re-fetch when page, search, or category changes

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/products`, {
        params: { search, category, page, limit },
      });
      setProducts(response.data.products);
      setMeta(response.data.meta);
    } catch (err) {
      setError(
        "Failed to fetch products. Please check the backend connection."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleApplyFilters = () => {
    setPage(1); // Reset page to 1 when filters change
    fetchProducts();
  };
  console.log(products);

  const renderProducts = () => {
    if (loading)
      return (
        <div className="tailspin-container">
          <TailSpin
            height="40"
            width="40"
            color="#687468ff"
            ariaLabel="loading"
          />
          <h4>Loading Products...</h4>
        </div>
      );
    if (error) return <p className="error">{error}</p>;
    if (products.length === 0)
      return <p>No products found matching your criteria.</p>;

    return (
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img className="product-image" src={product.image_url} />
            <h3>{product.name}</h3>
            <p>{product.short_desc}</p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <Link className="view-details-link" to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    const { totalPages } = meta;
    if (!totalPages || totalPages <= 1) return null;

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          className="pagination-btn"
          onClick={() => setPage((page) => page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Product Showcase</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name/description"
          value={search}
          onChange={handleSearchChange}
        />
        {/* You might want a <select> for categories in a real app */}
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={handleCategoryChange}
        />
        {/* Note: Filters apply on input change in this simple example, 
        but an explicit button is often better for performance. 
        I've simplified to only call fetchProducts on state change (in useEffect). */}
      </div>

      {renderProducts()}
      {renderPagination()}
    </div>
  );
};

export default ProductList;
