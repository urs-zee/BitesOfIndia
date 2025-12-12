export const PRICE_RANGES = [
  { value: "all", label: "All Prices" },
  { value: "under-100", label: "Under ₹100" },
  { value: "100-300", label: "₹100 - ₹300" },
  { value: "300-plus", label: "Above ₹300" },
];

export const CATEGORIES = [
  "Fried",
  "Syrup",
  "Fudge",
  "Ball",
  "Yogurt",
  "Pudding",
];

export const STORAGE_KEYS = {
  CART: "bite_of_india_cart",
  USER_PREFERENCES: "user_preferences",
};

export default { PRICE_RANGES, CATEGORIES, STORAGE_KEYS };
