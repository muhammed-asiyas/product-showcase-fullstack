import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { TailSpin } from 'react-loader-spinner';
import './index.css';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
  try {
    const response = await api.get('/enquiries');
    setEnquiries(response.data);
  } catch (err) {
    setError('Failed to fetch enquiries.');
  } finally {
    setLoading(false);
  }
};

const deleteEnquiry = async (id) => {
  if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

  try {
    await api.delete(`/enquiries/${id}`);
    setEnquiries(enquiries.filter((en) => en.id !== id));
  } catch (err) {
    alert("Failed to delete enquiry.");
  }
};


  if (loading)
    return (
      <div className="tailspin-container">
        <TailSpin height="40" width="40" color="#687468ff" ariaLabel="loading" />
        <h4>Loading Enquiries...</h4>
      </div>
    );

  if (error) return <h2>{error}</h2>;

  return (
    <div className="admin-container">
      <h2 className="title">Admin View: All Enquiries 📧</h2>

      {enquiries.length === 0 ? (
        <p>No enquiries submitted yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="enquiry-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.id}</td>
                  <td>{enquiry.product_name || 'N/A'}</td>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.message}</td>
                  <td>{new Date(enquiry.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEnquiry(enquiry.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
