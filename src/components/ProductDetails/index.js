
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import api from '../../utils/api';
import './index.css'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError('Product not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiryChange = (e) => {
    setEnquiryData({ ...enquiryData, [e.target.name]: e.target.value });
    setSubmitStatus(null); // Clear status on new input
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    // Add the productId to the data being sent
    const dataToSend = { ...enquiryData, productId: id };

    try {
      await api.post('/enquiries', dataToSend);
      setSubmitStatus('success');
      setEnquiryData({ name: '', email: '', phone: '', message: '' }); // Clear form
    } catch (err) {
      setSubmitStatus('error');
      console.error('Enquiry submission failed:', err.response ? err.response.data : err.message);
    }
  };

  if (loading)
      return (
        <div className="tailspin-container">
          <TailSpin
            height="40"
            width="40"
            color="#687468ff"
            ariaLabel="loading"
          />
          <h4>Product Details Loading...</h4>
        </div>
      );
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Product not found.</h2>;

  return (
    <div className="product-detail-page">
      <img className='product-details-image' src={product.image_url} />
      <h2>{product.name}</h2>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p>{product.long_desc}</p>

      {/* Enquiry Form */}
      <div className="enquiry-section">
        <h3>Enquire About This Product</h3>
        <form onSubmit={handleEnquirySubmit} className="enquiry-form">
          <input type="text" name="name" placeholder="Your Name" value={enquiryData.name} onChange={handleEnquiryChange} required />
          <input type="email" name="email" placeholder="Your Email" value={enquiryData.email} onChange={handleEnquiryChange} required />
          <input type="tel" name="phone" placeholder="Your Phone (Optional)" value={enquiryData.phone} onChange={handleEnquiryChange} />
          <textarea name="message" placeholder="Your Message" value={enquiryData.message} onChange={handleEnquiryChange} required />
          <button type="submit">Submit Enquiry</button>
        </form>

        {submitStatus === 'success' && <p className="success-message">🎉 Enquiry submitted successfully! We'll be in touch.</p>}
        {submitStatus === 'error' && <p className="error-message">🚨 Failed to submit enquiry. Please check your details and try again.</p>}
      </div>
    </div>
  );
};

export default ProductDetails;