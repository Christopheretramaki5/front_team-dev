import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, USER_TYPES } from "./contexts/AuthContext";
import Home from "./pages/Home";
import UserPages from "./pages/UserPages";
import AdminPanel from "./pages/AdminPanel";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import NavBar from "./pages/NavBar";

const App = () => {
  return (
    <AuthProvider>
      <NavBar />
      <AppRoutes />
    </AuthProvider>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicElement> <Home /> </PublicElement>} />
      <Route path="/login" element={<PublicElement> <Login /> </PublicElement>} />
      <Route path="/signup" element={<PublicElement> <Signup /> </PublicElement>} />
      <Route path="/user" element={<UserElement><UserPages /></UserElement>} />
      <Route path="/myProfile" element={<UserElement><UserPages /></UserElement>} />
      <Route path="/admin" element={<AdminElement><AdminPanel /></AdminElement>} />
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
    : <Navigate to="/login" replace />; // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
}

// Vérifie si l'utilisateur est admin
function AdminElement({ children }) {
  const { userType } = useAuth();
  return userType === USER_TYPES.ADMIN_USER
    ? children
    : <Navigate to="/" replace />; // Rediriger vers la page d'accueil si l'utilisateur n'est pas admin
}

export default App;
