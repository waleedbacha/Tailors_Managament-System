import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div className="container mt-5">
      {/* Header Section */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">👔 Royal Tailor Shop</h1>
        <p className="lead text-muted">Custom tailoring with precision and style.</p>
      </header>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-5">
        <Link to="/create" className="btn btn-primary btn-lg">
          ➕ New Order
        </Link>
        <Link to="/orders" className="btn btn-outline-secondary btn-lg">
          📋 View Orders
        </Link>
      </div>

      {/* Info Cards */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">👗 Dress Types</h5>
              <p className="card-text">We stitch suits, shirts, trousers, sherwanis, and more.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📏 Custom Measurements</h5>
              <p className="card-text">Perfect fits with manual or digital measurements.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🕒 Fast Delivery</h5>
              <p className="card-text">Get your clothes ready within 5–7 working days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 text-muted small">
        © 2025 Royal Tailor Shop. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
