import "./PurchaseModal.css";

function PurchaseModal({ isOpen, onClose, sweet }) {
  if (!isOpen || !sweet) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">✅</div>
        <h3 className="modal-title">Order Confirmed!</h3>
        <p className="modal-message">
          <strong>{sweet.name}</strong> added to your cart successfully!
        </p>
        <p className="modal-price">₹{sweet.price}</p>
        <div className="modal-actions">
          <button className="modal-btn continue" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
