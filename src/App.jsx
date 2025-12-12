import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Common/Navbar";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
import SweetCard from "./components/Dashboard/SweetCard";
import CartPage from "./components/Common/CartPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import Footer from "./components/Common/Footer";
import Spinner from "./components/Common/Spinner";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Career from "./components/pages/Career";
import Profile from "./components/pages/Profile";
import "./App.css";

function AppContent() {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #F4A460 100%)",
        }}
      >
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div
      className="App"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {!hideNavbar && <Navbar user={user} isAdmin={isAdmin} />}

      <main className="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          {/* <Route
            // path="/register"
            // element={user ? <Navigate to="/" /> : <Register />}
          /> */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <SweetCard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <CartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} loading={loading} adminOnly={true}>
                <AdminDashboard user={user} /> {/* 🔥 CHANGED */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/career"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Career />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!hideNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
