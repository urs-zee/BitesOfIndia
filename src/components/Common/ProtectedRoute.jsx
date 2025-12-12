import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import "./ProtectedRoute.css";

function ProtectedRoute({ children, adminOnly = false, user, loading }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate, adminOnly]);

  if (loading) {
    return (
      <div className="protected-loading">
        <Spinner size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  if (adminOnly && user && !user.isAdmin) {
    return (
      <div className="protected-error">
        <h2>Access Denied</h2>
        <p>Admin privileges required.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
