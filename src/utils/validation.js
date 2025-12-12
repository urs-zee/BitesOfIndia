export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateForm = (form) => {
  const errors = {};

  if (!form.name?.trim()) errors.name = "Name is required";
  if (!validateEmail(form.email)) errors.email = "Valid email is required";
  if (!validatePassword(form.password))
    errors.password = "Password must be 6+ characters";
  if (form.confirmPassword && form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default { validateEmail, validatePassword, validateForm };
