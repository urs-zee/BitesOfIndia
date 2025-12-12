import { useState, useEffect } from "react";
import "./EditSweetModal.css";

function EditSweetModal({ isOpen, onClose, onSubmit, sweet }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (isOpen && sweet) {
      setForm({
        name: sweet.name || "",
        price: sweet.price || "",
        quantity: sweet.quantity || "",
        category: sweet.category || "",
        image: sweet.image || "",
      });
    }
  }, [isOpen, sweet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && form.name && form.price && form.quantity) {
      onSubmit({ ...form, id: sweet?.id });
      onClose();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!isOpen || !sweet) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Sweet</h2>
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
        </div>

        <div className="current-sweet-preview">
          <img src={sweet.image} alt={sweet.name} className="preview-image" />
          <div className="preview-info">
            <h4>{sweet.name}</h4>
            <p>
              ₹{sweet.price} | Stock: {sweet.quantity}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Gulab Jamun"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Fried, Syrup, Fudge, etc."
            />
          </div>

          <div className="form-group">
            <label>Image URL (optional)</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-update">
              Update Sweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSweetModal;
