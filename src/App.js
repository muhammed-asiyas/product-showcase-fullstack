import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AdminEnquiries from './components/AdminEnquiries';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;