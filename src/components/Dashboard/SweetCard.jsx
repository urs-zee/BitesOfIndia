import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useSearchParams } from "react-router-dom";
import "./SweetCard.css";

function SweetCard() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sweets, setSweets] = useState([]);
  const [displayedSweets, setDisplayedSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [cardLoading, setCardLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const indianSweets = [
    {
      id: "1",
      name: "Gulab Jamun",
      price: 120,
      quantity: 25,
      category: "Fried",
      image:
        "https://prashantcorner.com/cdn/shop/files/DakGulabJamunSR-2.jpg?v=1718083866",
    },
    {
      id: "2",
      name: "Rasgulla",
      price: 95,
      quantity: 18,
      category: "Syrup",
      image:
        "https://classicradheysweets.in/cdn/shop/products/RASGULLA.png?v=1638877825",
    },
    {
      id: "3",
      name: "Jalebi",
      price: 85,
      quantity: 32,
      category: "Fried",
      image:
        "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/shubhi-mishra20171004002157988.jpeg",
    },
    {
      id: "4",
      name: "Kaju Katli",
      price: 250,
      quantity: 12,
      category: "Fudge",
      image:
        "https://www.parsidairyfarm.com/cdn/shop/files/KesarKajuKatli.jpg?v=1699528221",
    },
    {
      id: "5",
      name: "Laddu",
      price: 110,
      quantity: 28,
      category: "Ball",
      image:
        "https://bombaysweets.in/cdn/shop/products/niceLadoo.png?v=1666085560",
    },
    {
      id: "6",
      name: "Barfi",
      price: 180,
      quantity: 15,
      category: "Fudge",
      image:
        "https://www.cookwithnabeela.com/wp-content/uploads/2024/02/MilkBarfi-500x500.webp",
    },
    {
      id: "7",
      name: "Rasmalai",
      price: 140,
      quantity: 20,
      category: "Syrup",
      image:
        "https://prashantcorner.com/cdn/shop/files/RasmalaiSR-3_b0e4cd60-a20b-45e7-96f8-88776536d7c0.png?v=1720595089&width=1946",
    },
    {
      id: "8",
      name: "Peda",
      price: 90,
      quantity: 35,
      category: "Fudge",
      image:
        "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2023/08/Kesar-Elaichi-peda-H1.jpg?fit=600%2C904&ssl=1",
    },
    {
      id: "9",
      name: "Mysore Pak",
      price: 220,
      quantity: 8,
      category: "Fudge",
      image:
        "https://indiasweethouse.in/cdn/shop/files/MaharajaMysorePak.png?v=1718866847",
    },
    {
      id: "10",
      name: "Cham Cham",
      price: 105,
      quantity: 22,
      category: "Syrup",
      image:
        "https://cdn1.foodviva.com/static-content/food-images/bengali-recipes/cham-cham/cham-cham.jpg",
    },
    {
      id: "11",
      name: "Motichoor Laddu",
      price: 150,
      quantity: 16,
      category: "Ball",
      image:
        "https://sangamsweets.in/cdn/shop/files/Motichur_Laddu_Sweets.png?v=1747030843",
    },
    {
      id: "12",
      name: "Soan Papdi",
      price: 200,
      quantity: 10,
      category: "Fudge",
      image:
        "https://ganguram.com/cdn/shop/files/soan-papdi.jpg?v=1757319687&width=480",
    },
    {
      id: "13",
      name: "Kalakand",
      price: 160,
      quantity: 14,
      category: "Fudge",
      image:
        "https://agrasweetsbanjara.com/cdn/shop/files/Ajmeri-Kalakand_1000x1000_752b0c02-90bf-45a4-94c0-4e1f7e5640b2.jpg?v=1715143748",
    },
    {
      id: "14",
      name: "Malpua",
      price: 130,
      quantity: 19,
      category: "Fried",
      image:
        "https://agrasweetsbanjara.com/cdn/shop/files/Ajmeri-Kalakand_1000x1000_752b0c02-90bf-45a4-94c0-4e1f7e5640b2.jpg?v=1715143748",
    },
    {
      id: "15",
      name: "Imarti",
      price: 115,
      quantity: 24,
      category: "Fried",
      image:
        "https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/sanjeev-kapoor/media/post_banners/13521226b572c966e530f0f827bd04bb370a4ca27e83fc3efac5e3ee1b6afb07.jpg",
    },
    {
      id: "16",
      name: "Shrikhand",
      price: 135,
      quantity: 17,
      category: "Yogurt",
      image:
        "https://ministryofcurry.com/wp-content/uploads/2022/09/Shrikhand-17-500x500.jpg",
    },
    {
      id: "17",
      name: "Sandesh",
      price: 98,
      quantity: 30,
      category: "Fudge",
      image:
        "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Sandesh-scaled.jpg?v=1619103410",
    },
    {
      id: "18",
      name: "Phirni",
      price: 75,
      quantity: 42,
      category: "Pudding",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNuYUaMKRMalOQrFDSnewNsouEzUOlbvHcQ&s",
    },
    {
      id: "19",
      name: "Coconut Barfi",
      price: 195,
      quantity: 11,
      category: "Fudge",
      image:
        "https://mytastycurry.com/wp-content/uploads/2017/08/coconut-fudge-with-milk-powder.jpg",
    },
    {
      id: "20",
      name: "Besan Ladoo",
      price: 125,
      quantity: 23,
      category: "Ball",
      image:
        "https://prashantcorner.com/cdn/shop/files/BesanLaddooSR-1.jpg?v=1717768060",
    },
    {
      id: "21",
      name: "Doodh Peda",
      price: 88,
      quantity: 38,
      category: "Fudge",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsYK4hbBY42wBSoqu5NN5qGiCKzD-FTKuMA&s",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSweets(indianSweets);
      setDisplayedSweets(indianSweets.slice(0, 12));
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!searchTerm) {
      setDisplayedSweets(showMore ? sweets : sweets.slice(0, 12));
    } else {
      const filtered = sweets.filter((sweet) =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedSweets(filtered);
      setShowMore(true);
    }
  }, [searchTerm, sweets, showMore]);

  const handleAddToCart = async (sweet) => {
    if (sweet.quantity <= 0) {
      toast.error("Out of stock!");
      return;
    }

    setCardLoading((prev) => ({ ...prev, [sweet.id]: true }));

    try {
      await updateDoc(doc(db, "sweets", sweet.id), {
        quantity: increment(-1),
      });

      addToCart(sweet, 1);
      toast.success(`${sweet.name} added to cart! 🛒`);

      setSweets((prev) =>
        prev.map((s) =>
          s.id === sweet.id ? { ...s, quantity: s.quantity - 1 } : s
        )
      );
      setDisplayedSweets((prev) =>
        prev.map((s) =>
          s.id === sweet.id ? { ...s, quantity: s.quantity - 1 } : s
        )
      );
    } catch (error) {
      addToCart(sweet, 1);
      toast.success(`${sweet.name} added to cart! 🛒`);
    } finally {
      setCardLoading((prev) => ({ ...prev, [sweet.id]: false }));
    }
  };

  const handleLoadMore = () => {
    setDisplayedSweets(sweets);
    setShowMore(true);
    toast.info("Loaded all 21 mithai varieties!");
  };

  if (loading) {
    return (
      <div className="sweets-container">
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
      </div>
    );
  }

  return (
    <div className="sweets-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Bite of India</h1>
          <p>
            Authentic Indian Mithai since 1995 | Fresh daily from Karol Bagh
          </p>
          <p>
            21+ varieties | Pure ghee | No preservatives | Mohit Rai's recipes
          </p>
          <div className="hero-stats">
            <span>⭐ 4.9/5 (5000+ reviews)</span>
            <span>2hr Delhi NCR delivery</span>
          </div>
        </div>
      </div>

      <div className="sweets-header">
        <h2>Our Delicious Collection</h2>
        <input
          type="text"
          placeholder="Search sweets... (Gulab Jamun, Rasgulla...)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value) {
              setSearchParams({ search: e.target.value });
            } else {
              setSearchParams({});
            }
          }}
          className="sweets-search-input"
        />
      </div>

      <div className="sweets-grid">
        {displayedSweets.length > 0 ? (
          displayedSweets.map((sweet) => (
            <div key={sweet.id} className="sweet-card">
              <div className="sweet-image-wrapper">
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  className="sweet-image"
                />
                <div className="sweet-badge">₹{sweet.price}</div>
                {sweet.quantity === 0 && (
                  <div className="sold-out-badge">Sold Out</div>
                )}
              </div>
              <div className="sweet-info">
                <h3 className="sweet-name">{sweet.name}</h3>
                <p className="sweet-category">{sweet.category}</p>
                <p className="sweet-stock">
                  Stock: {sweet.quantity > 0 ? sweet.quantity : "Out of stock"}
                </p>
                <button
                  className={`purchase-btn ${
                    sweet.quantity === 0 ? "disabled" : ""
                  }`}
                  onClick={() => handleAddToCart(sweet)}
                  disabled={sweet.quantity === 0 || cardLoading[sweet.id]}
                >
                  {cardLoading[sweet.id]
                    ? "Adding..."
                    : sweet.quantity === 0
                    ? "Sold Out"
                    : `Add to Cart`}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No sweets found for "{searchTerm}"</h3>
            <p>Try searching for Gulab Jamun, Jalebi, or Rasgulla</p>
          </div>
        )}
      </div>

      {!searchTerm && !showMore && sweets.length > 12 && (
        <div className="load-more-section">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More ({sweets.length - 12} more sweets)
          </button>
        </div>
      )}
    </div>
  );
}

export default SweetCard;
