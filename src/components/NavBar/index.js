import { Link } from "react-router-dom";
import './index.css'


const NavBar = () => (
    <nav className="navbar">
          <Link to="/" className="product-showcase-head">Product Showcase</Link>
          <div>
            <Link className="nav-item" to="/">Products</Link>
            <Link className="nav-item" to="/admin/enquiries">Admin Enquiries</Link>
          </div>
        </nav>
)

export default NavBar;