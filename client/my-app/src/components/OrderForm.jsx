import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../orders/orderSlice.js'; // make sure this path is correct
import '../App.css';

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    dressType: '',
    fabric: '',
    deliveryDate: '',
    measurements: {
      chest: '',
      waist: '',
      hips: '',
      length: '',
    },
    notes: '',
  });

  // ✅ Handle Change (for nested measurements too)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['chest', 'waist', 'hips', 'length'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createOrder(form));
      alert("✅ Order submitted successfully!");
      navigate('/orders');
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("❌ Failed to submit order.");
    }
  };

  return (
    <div className="new-order-wrapper d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-lg w-100 bg-light" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4">🧵 New Tailor Order</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <input
            type="text"
            name="dressType"
            placeholder="Dress Type"
            value={form.dressType}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <input
            type="text"
            name="fabric"
            placeholder="Fabric"
            value={form.fabric}
            onChange={handleChange}
            className="form-control mb-3"
          />
          <input
            type="date"
            name="deliveryDate"
            value={form.deliveryDate}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <h5 className="text-center mt-4 mb-3">📏 Measurements</h5>
          <div className="row">
            {['chest', 'waist', 'hips', 'length'].map((field) => (
              <div className="col-md-6 mb-3" key={field}>
                <input
                  type="number"
                  name={field}
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (in)`}
                  value={form.measurements[field]}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            ))}
          </div>

          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={form.notes}
            onChange={handleChange}
            className="form-control mb-4"
            rows="3"
          ></textarea>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              ✅ Submit Order
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate('/')}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
