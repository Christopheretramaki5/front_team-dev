import { useEffect, createContext, useContext, useState } from "react";

export const USER_TYPES = {
  PUBLIC: "Public User",
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(USER_TYPES.PUBLIC);

  // Récupération des données depuis localStorage au montage
  useEffect(() => {
    const storedUser = localStorage.getItem("userType");
    if (storedUser) {
      setUserType(storedUser);
    }
  }, []);

  // Synchronisation avec localStorage
  useEffect(() => {
    if (userType === USER_TYPES.PUBLIC) {
      localStorage.removeItem("userType");
    } else {
      localStorage.setItem("userType", userType);
    }
  }, [userType]);

  // Fonction de connexion
  const login = (email, password) => {
    if (email === "admin@example.com" && password === "admin123") {
      setUserType(USER_TYPES.ADMIN_USER);
    } else if (email === "user@example.com" && password === "user123") {
      setUserType(USER_TYPES.NORMAL_USER);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  // Fonction d'inscription
  const signup = (email, password) => {
    if (email && password) {
      setUserType(USER_TYPES.NORMAL_USER);
    } else {
      throw new Error("Please provide valid credentials");
    }
  };

  // Fonction de déconnexion (avec rechargement de la page)
  const logout = () => {
    setUserType(USER_TYPES.PUBLIC);
    localStorage.removeItem("userType");
    window.location.reload(); // 🚀 Force le rechargement pour mettre à jour l'affichage
  };

  return (
    <AuthContext.Provider value={{ userType, setUserType, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
