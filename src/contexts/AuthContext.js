import { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const USER_TYPES = {
  PUBLIC: "Public User",
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 🚀 Ajout d'un état pour forcer le re-render

  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || USER_TYPES.PUBLIC;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userType");
    if (storedUser && Object.values(USER_TYPES).includes(storedUser)) {
      setUserType(storedUser);
    }
  }, []);

  useEffect(() => {
    if (userType === USER_TYPES.PUBLIC) {
      localStorage.removeItem("userType");
    } else {
      localStorage.setItem("userType", userType);
    }
    setIsAuthenticated(userType !== USER_TYPES.PUBLIC); // 🚀 Force un re-render après mise à jour
  }, [userType]);

  const login = (email, password) => {
    if (email === "admin@example.com" && password === "admin123") {
      setUserType(USER_TYPES.ADMIN_USER);
      localStorage.setItem("userType", USER_TYPES.ADMIN_USER);
    } else if (email === "user@example.com" && password === "user123") {
      setUserType(USER_TYPES.NORMAL_USER);
      localStorage.setItem("userType", USER_TYPES.NORMAL_USER);
    } else {
      throw new Error("Invalid credentials");
    }
    setIsAuthenticated(true); // ✅ Marquer comme connecté
  };

  const logout = () => {
    // Suppression des données utilisateur du localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");

    // Mise à jour de l'état d'authentification
    setUserType(USER_TYPES.PUBLIC);
    setIsAuthenticated(false);

    // ✅ Redirige proprement en utilisant navigate avec replace: true
    navigate("/", { replace: true }); 
    setTimeout(() => {
        window.location.reload(); // Recharge la page après 300ms
    }, 300);
};



  return (
    <AuthContext.Provider value={{ userType, setUserType, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
