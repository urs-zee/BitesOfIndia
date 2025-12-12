export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatStock = (quantity) => {
  if (quantity === 0) return "Out of stock";
  if (quantity < 5) return `Low stock: ${quantity}`;
  return `In stock: ${quantity}`;
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default { formatPrice, formatStock, truncateText };
