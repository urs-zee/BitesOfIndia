import { useAuth } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useAuth();

  const isLoggedIn = !!context.user;
  const isAdmin = context.user?.isAdmin || false;

  return {
    ...context,
    isLoggedIn,
    isAdmin,
  };
};
