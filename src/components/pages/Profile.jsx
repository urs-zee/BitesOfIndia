import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const { cartCount, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleEditToggle = () => {
    setName(user?.name || "");
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    setSaving(true);

    setTimeout(() => {
      setEditMode(false);
      setSaving(false);
    }, 1000);
  };

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  if (!user) {
    return (
      <div className="profile-empty">
        <h2>Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <h1>My Profile</h1>
        <p>Manage your account & orders</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <label>Name:</label>
              {editMode ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span className="info-value">{user.name || "Not set"}</span>
              )}
            </div>
            <div className="info-row">
              <label>Email:</label>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <label>Role:</label>
              <span className={`role-badge ${user.isAdmin ? "admin" : "user"}`}>
                {user.isAdmin ? "Admin" : "Customer"}
              </span>
            </div>
            <div className="info-row">
              <label>Member Since:</label>
              <span className="info-value">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Recent"}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            {editMode ? (
              <>
                <button
                  className="save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button className="cancel-btn" onClick={handleEditToggle}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={handleEditToggle}>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>Cart Summary</h3>
            <div className="stat-row">
              <span>Items:</span>
              <span>{cartCount}</span>
            </div>
            <div className="stat-row total">
              <span>Cart Total:</span>
              <span>₹{getTotalPrice().toLocaleString()}</span>
            </div>
            <Link to="/cart" className="view-cart-btn">
              View Cart
            </Link>
          </div>

          {user.isAdmin && (
            <div className="stat-card admin">
              <h3>Admin Dashboard</h3>
              <p>Manage sweets, orders & inventory</p>
              <Link to="/admin" className="admin-btn">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="profile-orders">
          <h3>Recent Orders</h3>
          <div className="orders-empty">
            <p>No orders yet. Start shopping!</p>
            <Link to="/" className="shop-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="profile-footer-actions">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
