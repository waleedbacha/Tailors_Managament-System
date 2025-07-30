import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, updateOrder } from '../orders/orderSlice';

const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentOrder, loading, error } = useSelector((state) => state.orders);

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    dressType: '',
    fabric: '',
    deliveryDate: '',
    notes: '',
    measurements: {
      chest: '',
      waist: '',
      hips: '',
      length: ''
    },
    status: 'Pending'
  });

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOrder) {
      setForm({
        ...currentOrder,
        deliveryDate: currentOrder.deliveryDate?.slice(0, 10) || '',
        measurements: {
          chest: currentOrder.measurements?.chest || '',
          waist: currentOrder.measurements?.waist || '',
          hips: currentOrder.measurements?.hips || '',
          length: currentOrder.measurements?.length || ''
        }
      });
    }
  }, [currentOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['chest', 'waist', 'hips', 'length'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateOrder({ id, updateData: form }));
      alert('✅ Order updated successfully!');
      navigate('/orders');
    } catch (err) {
      alert('❌ Failed to update order');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-4 text-center text-primary">✏️ Edit Tailor Order</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            className="form-control mb-3"
            value={form.customerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-3"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dressType"
            placeholder="Dress Type"
            className="form-control mb-3"
            value={form.dressType}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fabric"
            placeholder="Fabric"
            className="form-control mb-3"
            value={form.fabric}
            onChange={handleChange}
          />
          <input
            type="date"
            name="deliveryDate"
            className="form-control mb-3"
            value={form.deliveryDate}
            onChange={handleChange}
            required
          />

          <h5 className="text-center mt-4 mb-3">📏 Measurements</h5>
          <div className="row">
            {['chest', 'waist', 'hips', 'length'].map((field) => (
              <div className="col-md-6 mb-3" key={field}>
                <input
                  type="number"
                  name={field}
                  className="form-control"
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (in)`}
                  value={form.measurements[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <textarea
            name="notes"
            className="form-control mb-3"
            placeholder="Additional Notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
          ></textarea>

          <div className="form-group mb-4">
            <label>Status</label>
            <select
              name="status"
              className="form-control"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              ✅ Save Changes
            </button>
            <Link to="/orders" className="btn btn-secondary">
              🔙 Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
