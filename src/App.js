import React from "react";
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, USER_TYPES } from "./contexts/AuthContext";
import Home from "./pages/Home";
import UserPages from "./pages/UserPages";
import AdminPanel from "./pages/AdminPanel";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
// import NavBar from "./pages/NavBar";
import Profile from "./pages/Profile";
import { CartProvider } from "./contexts/CartContext";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider> {/* Envelopper l'application avec CartProvider */}
        {/* <ConditionalNavBar /> Navbar conditionnelle */}
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
};

// Afficher la navbar uniquement si l'utilisateur n'est pas admin
// function ConditionalNavBar() {
//   const { userType } = useAuth();
//   return userType !== USER_TYPES.ADMIN_USER ? <NavBar /> : null;
// }

// Afficher les routes en fonction de l'utilisateur connecté ou non
function AppRoutes() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<PublicElement><Home /></PublicElement>} />
      <Route path="/login" element={<PublicElement><Login /></PublicElement>} />
      <Route path="/signup" element={<PublicElement><Signup /></PublicElement>} />

      {/* Routes utilisateur */}
      <Route path="/user" element={<UserElement><UserPages /></UserElement>} />
      <Route path="/myProfile" element={<UserElement><Profile /></UserElement>} />

      {/* Routes admin */}
      <Route path="/admin" element={<AdminElement><AdminPanel /></AdminElement>} />

      {/* Route pour capturer les erreurs 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Garde les pages publiques accessibles
function PublicElement({ children }) {
  return <>{children}</>;
}

// Vérifie si l'utilisateur a accès aux pages utilisateur
function UserElement({ children }) {
  const { userType } = useAuth();
  return userType === USER_TYPES.NORMAL_USER || userType === USER_TYPES.ADMIN_USER
    ? children
    : <Navigate to="/login" replace />; // Rediriger vers la page d'accueil' si l'utilisateur n'est pas connecté
}

// Vérifie si l'utilisateur est admin
function AdminElement({ children }) {
  const { userType } = useAuth();
  return userType === USER_TYPES.ADMIN_USER
    ? children
    : <Navigate to="/" replace />; // ✅ Rediriger si l' admin est déconnecter
}

export default App;
