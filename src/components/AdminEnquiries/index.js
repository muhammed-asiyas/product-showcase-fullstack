
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { TailSpin } from 'react-loader-spinner';
import './index.css'

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(enquiries)

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/enquiries');
      setEnquiries(response.data);
    } catch (err) {
      setError('Failed to fetch enquiries. This route might require admin authentication in a real app.');
      console.error(err);
    } finally {
      setLoading(false);
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
          <h4>Loading Enquiries...</h4>
        </div>
      );
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>Admin View: All Enquiries 📧</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry.id}>
                <td>{enquiry.id}</td>
                {/* Note: productName comes from the LEFT JOIN in your enquiryModel.js */}
                <td>{enquiry.product_name || 'N/A'}</td> 
                <td>{enquiry.name}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.phone}</td>
                <td>{enquiry.message}</td>
                <td>{new Date(enquiry.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEnquiries;