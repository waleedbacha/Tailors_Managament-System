import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  deleteOrder,
} from "../orders/orderSlice";
import { Link } from "react-router-dom";
import "../App.css";

const ViewOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">📋 All Tailor Orders</h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading orders...</p>
        </div>
      ) : error ? (
        <p className="text-danger text-center">❌ {error}</p>
      ) : orders.length === 0 ? (
        <p className="text-muted text-center">No orders found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {orders.map((order) => (
            <div className="col" key={order._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-success">{order.customerName}</h5>
                  <p className="mb-1"><strong>📞 Phone:</strong> {order.phone}</p>
                  <p className="mb-1"><strong>👗 Dress Type:</strong> {order.dressType}</p>
                  <p className="mb-1"><strong>🧵 Fabric:</strong> {order.fabric || "Not specified"}</p>
                  <p className="mb-1"><strong>📆 Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                  <p className="mb-1"><strong>📏 Measurements:</strong></p>
                  <ul className="list-unstyled ps-3">
                    <li>Chest: {order.measurements?.chest || 0}"</li>
                    <li>Waist: {order.measurements?.waist || 0}"</li>
                    <li>Hips: {order.measurements?.hips || 0}"</li>
                    <li>Length: {order.measurements?.length || 0}"</li>
                  </ul>
                  <p className="mb-1"><strong>📝 Notes:</strong> {order.notes || "None"}</p>
                  <p className="mb-1"><strong>Status:</strong> 
                    <span className={`badge bg-${order.status === "Completed" ? "success" : order.status === "In Progress" ? "warning" : "secondary"} ms-2`}>
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="card-footer bg-white d-flex justify-content-between">
                  <Link to={`/edit/${order._id}`} className="btn btn-outline-warning btn-sm">
                    ✏️ Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(order._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">
          🔙 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ViewOrders;
