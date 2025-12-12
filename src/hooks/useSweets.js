import { useState, useEffect } from "react";  
import { toast, ToastContainer } from "react-toastify";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../services/firebase";
import "./SweetCard.css";

function SweetCard({ onPurchase }) {
  const [sweets, setSweets] = useState([]);
  const [displayedSweets, setDisplayedSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [cardLoading, setCardLoading] = useState({});
  const indianSweets = [
    { id: "1", name: "Gulab Jamun", price: 120, quantity: 25, category: "Fried", image: "https://images.unsplash.com/photo-1617096707519-41f8f5afe2f9?w=400" },
    { id: "2", name: "Rasgulla", price: 95, quantity: 18, category: "Syrup", image: "https://images.unsplash.com/photo-1661450737605-1a377618622a?w=400" },
    { id: "3", name: "Jalebi", price: 85, quantity: 32, category: "Fried", image: "https://images.unsplash.com/photo-1579586140626-717272677e25?w=400" },
    { id: "4", name: "Kaju Katli", price: 250, quantity: 12, category: "Fudge", image: "https://images.unsplash.com/photo-1603353861487-497afd55e999?w=400" },
    { id: "5", name: "Laddu", price: 110, quantity: 28, category: "Ball", image: "https://images.unsplash.com/photo-1606283076332-e2c099115616?w=400" },
    { id: "6", name: "Barfi", price: 180, quantity: 15, category: "Fudge", image: "https://images.unsplash.com/photo-1605246491499-07c8d5d8dc79?w=400" },
    { id: "7", name: "Rasmalai", price: 140, quantity: 20, category: "Syrup", image: "https://images.unsplash.com/photo-1661450737605-1a377618622a?w=400" },
    { id: "8", name: "Peda", price: 90, quantity: 35, category: "Fudge", image: "https://images.unsplash.com/photo-1603353861487-497afd55e999?w=400" },
    { id: "9", name: "Mysore Pak", price: 220, quantity: 8, category: "Fudge", image: "https://images.unsplash.com/photo-1617096707519-41f8f5afe2f9?w=400" },
    { id: "10", name: "Cham Cham", price: 105, quantity: 22, category: "Syrup", image: "https://images.unsplash.com/photo-1579586140626-717272677e25?w=400" },
    { id: "11", name: "Motichoor Laddu", price: 150, quantity: 16, category: "Ball", image: "https://images.unsplash.com/photo-1606283076332-e2c099115616?w=400" },
    { id: "12", name: "Soan Papdi", price: 200, quantity: 10, category: "Fudge", image: "https://images.unsplash.com/photo-1605246491499-07c8d5d8dc79?w=400" },
    { id: "13", name: "Kalakand", price: 160, quantity: 14, category: "Fudge", image: "https://images.unsplash.com/photo-1603353861487-497afd55e999?w=400" },
    { id: "14", name: "Malpua", price: 130, quantity: 19, category: "Fried", image: "https://images.unsplash.com/photo-1617096707519-41f8f5afe2f9?w=400" },
    { id: "15", name: "Imarti", price: 115, quantity: 24, category: "Fried", image: "https://images.unsplash.com/photo-1579586140626-717272677e25?w=400" },
    { id: "16", name: "Shrikhand", price: 135, quantity: 17, category: "Yogurt", image: "https://images.unsplash.com/photo-1661450737605-1a377618622a?w=400" },
    { id: "17", name: "Sandesh", price: 98, quantity: 30, category: "Fudge", image: "https://images.unsplash.com/photo-1605246491499-07c8d5d8dc79?w=400" },
    { id: "18", name: "Phirni", price: 75, quantity: 42, category: "Pudding", image: "https://images.unsplash.com/photo-1606283076332-e2c099115616?w=400" },
    { id: "19", name: "Coconut Barfi", price: 195, quantity: 11, category: "Fudge", image: "https://images.unsplash.com/photo-1603353861487-497afd55e999?w=400" },
    { id: "20", name: "Besan Ladoo", price: 125, quantity: 23, category: "Ball", image: "https://images.unsplash.com/photo-1606283076332-e2c099115616?w=400" },
    { id: "21", name: "Doodh Peda", price: 88, quantity: 38, category: "Fudge", image: "https://images.unsplash.com/photo-1603353861487-497afd55e999?w=400" }
  ];
  useEffect(() => {
    setTimeout(() => {
      setSweets(indianSweets);
      setDisplayedSweets(indianSweets.slice(0, 12)); 
      setLoading(false);
    }, 1000);
  }, []);

  const handlePurchase = async (sweetId) => {
    if (sweets.find((s) => s.id === sweetId)?.quantity <= 0) return;

    setCardLoading((prev) => ({ ...prev, [sweetId]: true }));
    try {
      await updateDoc(doc(db, "sweets", sweetId), {
        quantity: increment(-1),
      });
      setSweets((prev) =>
        prev.map((sweet) =>
          sweet.id === sweetId
            ? { ...sweet, quantity: sweet.quantity - 1 }
            : sweet
        )
      );
      setDisplayedSweets((prev) =>
        prev.map((sweet) =>
          sweet.id === sweetId
            ? { ...sweet, quantity: sweet.quantity - 1 }
            : sweet
        )
      );
      toast.success("Purchase successful! 🍬");
    } catch (error) {
      setSweets((prev) =>
        prev.map((sweet) =>
          sweet.id === sweetId
            ? { ...sweet, quantity: sweet.quantity - 1 }
            : sweet
        )
      );
      setDisplayedSweets((prev) =>
        prev.map((sweet) =>
          sweet.id === sweetId
            ? { ...sweet, quantity: sweet.quantity - 1 }
            : sweet
        )
      );
      toast.success("Added to cart! 🍬");
    } finally {
      setCardLoading((prev) => ({ ...prev, [sweetId]: false }));
    }
  };

  const handleLoadMore = () => {
    setDisplayedSweets(sweets); 
    setShowMore(true);
    toast.info("Loaded all 21 mithai varieties! 🇮🇳");
  };
  if (loading) {
    return (
      <div className="sweet-card loading-card">
        <div className="sweet-image-wrapper">
          <div className="image-placeholder"></div>
        </div>
        <div className="sweet-info">
          <div className="placeholder-text"></div>
          <div className="placeholder-text short"></div>
          <button className="purchase-btn disabled">Loading...</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sweets-container">
      <div className="sweets-grid">
        {displayedSweets.map((sweet) => (
          <div key={sweet.id} className="sweet-card">
            <div className="sweet-image-wrapper">
              <img
                src={sweet.image || "https://via.placeholder.com/300x250/8B4513/D2B48C?text=Sweet"}
                alt={sweet.name}
                className="sweet-image"
              />
              <div className="sweet-badge">₹{sweet.price}</div>
              {sweet.quantity === 0 && <div className="sold-out-badge">Sold Out</div>}
            </div>
            <div className="sweet-info">
              <h3 className="sweet-name">{sweet.name}</h3>
              <p className="sweet-stock">
                {sweet.quantity > 0 ? `Stock: ${sweet.quantity}` : "Out of stock"}
              </p>
              <button
                className={`purchase-btn ${sweet.quantity === 0 ? "disabled" : ""}`}
                onClick={() => handlePurchase(sweet.id)}
                disabled={sweet.quantity === 0 || cardLoading[sweet.id]}
              >
                {cardLoading[sweet.id]
                  ? "Processing..."
                  : sweet.quantity === 0
                  ? "Sold Out"
                  : "🛒 Purchase Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {!showMore && sweets.length > 12 && (
        <div className="load-more-section">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More (9 more mithai) ➕
          </button>
        </div>
      )}

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}

export default SweetCard;
