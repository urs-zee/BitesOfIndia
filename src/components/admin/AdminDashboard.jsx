import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import "./AdminDashboard.css";

function AdminDashboard() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [stats, setStats] = useState({ total: 0, lowStock: 0, outOfStock: 0 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, type: "", data: null });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: 0,
    category: "",
    image: "",
  });
  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const q = query(collection(db, "sweets"));
      const snapshot = await getDocs(q);
      const sweetsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetsData);
      const total = sweetsData.length;
      const lowStock = sweetsData.filter(
        (s) => s.quantity > 0 && s.quantity <= 5
      ).length;
      const outOfStock = sweetsData.filter((s) => s.quantity === 0).length;
      setStats({ total, lowStock, outOfStock });
    } catch (error) {
      toast.error("Failed to load sweets data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSweet = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "sweets"), formData);
      toast.success("Sweet added successfully!");
      setModal({ open: false, type: "", data: null });
      setFormData({
        name: "",
        price: "",
        quantity: 0,
        category: "",
        image: "",
      });
      fetchSweets();
    } catch (error) {
      toast.error("Failed to add sweet");
    }
  };

  const handleUpdateSweet = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "sweets", modal.data.id), formData);
      toast.success("Sweet updated successfully!");
      setModal({ open: false, type: "", data: null });
      fetchSweets();
    } catch (error) {
      toast.error("Failed to update sweet");
    }
  };

  const handleDeleteSweet = async (id) => {
    if (window.confirm("Delete this sweet?")) {
      try {
        await deleteDoc(doc(db, "sweets", id));
        toast.success("Sweet deleted!");
        fetchSweets();
      } catch (error) {
        toast.error("Failed to delete sweet");
      }
    }
  };

  const openModal = (type, data = null) => {
    if (type === "edit") {
      setFormData({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
        image: data.image,
      });
    }
    setModal({ open: true, type, data });
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard - {user?.name}</h1>
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>{stats.total}</h3>
            <p>Total Sweets</p>
          </div>
          <div className="stat-card low">
            <h3>{stats.lowStock}</h3>
            <p>Low Stock</p>
          </div>
          <div className="stat-card out">
            <h3>{stats.outOfStock}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button className="add-btn" onClick={() => openModal("add")}>
          + Add New Sweet
        </button>
      </div>

      <div className="sweets-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map((sweet) => (
              <tr key={sweet.id}>
                <td>
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="table-img"
                  />
                </td>
                <td>{sweet.name}</td>
                <td>₹{sweet.price}</td>
                <td
                  className={
                    sweet.quantity === 0
                      ? "out-stock"
                      : sweet.quantity <= 5
                      ? "low-stock"
                      : ""
                  }
                >
                  {sweet.quantity}
                </td>
                <td>{sweet.category}</td>
                <td>
                  <button
                    className="edit-table-btn"
                    onClick={() => openModal("edit", sweet)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-table-btn"
                    onClick={() => handleDeleteSweet(sweet.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal.open && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{modal.type === "add" ? "Add New Sweet" : "Edit Sweet"}</h2>
            <form
              onSubmit={
                modal.type === "add" ? handleAddSweet : handleUpdateSweet
              }
            >
              <input
                type="text"
                placeholder="Sweet Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value),
                  })
                }
                required
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                <option value="Fried">Fried</option>
                <option value="Syrup">Syrup</option>
                <option value="Fudge">Fudge</option>
                <option value="Ball">Ball</option>
                <option value="Yogurt">Yogurt</option>
                <option value="Pudding">Pudding</option>
              </select>
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
              <div className="modal-actions">
                <button type="submit">
                  {modal.type === "add" ? "Add Sweet" : "Update Sweet"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setModal({ open: false, type: "", data: null })
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
