export const API_DELAY = 1000;

export const mockApiCall = async (success = true) => {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));
  return success;
};

export const handleApiError = (error) => {
  if (error.code) {
    switch (error.code) {
      case "auth/invalid-credential":
        return "Invalid email or password";
      case "auth/email-already-in-use":
        return "Email already registered";
      case "auth/weak-password":
        return "Password is too weak";
      default:
        return "Something went wrong";
    }
  }
  return "Network error. Please try again";
};

export default { API_DELAY, mockApiCall, handleApiError };
    