export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const getImageUrl = (image) => {
  if (!image) {
    return "https://via.placeholder.com/300x250/8B4513/D2B48C?text=Sweet";
  }
  return image;
};

export default { debounce, copyToClipboard, getImageUrl };
