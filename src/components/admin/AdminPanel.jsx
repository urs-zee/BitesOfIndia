import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import AddSweetModal from "./AddSweetModal";
import EditSweetModal from "./EditSweetModal";
import Spinner from "../Common/Spinner";
import "./AdminPanel.css";

function AdminPanel({ user }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSweet, setEditSweet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sweets"));
      const sweetsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetsData);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSweet = async (sweetData) => {
    try {
      await addDoc(collection(db, "sweets"), {
        ...sweetData,
        createdBy: user.uid,
      });
      fetchSweets();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding sweet:", error);
    }
  };

  const handleUpdateSweet = async (sweetData) => {
    try {
      await updateDoc(doc(db, "sweets", editSweet.id), sweetData);
      fetchSweets();
      setEditSweet(null);
    } catch (error) {
      console.error("Error updating sweet:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
      try {
        await deleteDoc(doc(db, "sweets", id));
        setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
      } catch (error) {
        console.error("Error deleting sweet:", error);
      }
    }
  };

  const filteredSweets = sweets.filter((sweet) =>
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-loading">
        <Spinner size="large" />
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">
          Manage sweets inventory ({filteredSweets.length} items)
        </p>

        <div className="admin-controls">
          <input
            type="text"
            className="admin-search"
            placeholder="Search sweets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="admin-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add New Sweet
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
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
            {filteredSweets.map((sweet) => (
              <tr key={sweet.id}>
                <td>
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="admin-sweet-image"
                  />
                </td>
                <td>{sweet.name}</td>
                <td>₹{sweet.price}</td>
                <td>{sweet.quantity}</td>
                <td>{sweet.category}</td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => setEditSweet(sweet)}
                    >
                       Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(sweet.id)}
                    >
                       Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSweetModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSweet}
      />
      <EditSweetModal
        isOpen={!!editSweet}
        onClose={() => setEditSweet(null)}
        onSubmit={handleUpdateSweet}
        sweet={editSweet}
      />
    </div>
  );
}

export default AdminPanel;
