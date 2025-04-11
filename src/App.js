import React from "react";
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, USER_TYPES } from "./contexts/AuthContext";
import Home from "./pages/Home";
import UserPages from "./pages/UserPages";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Profile from "./pages/Profile";
import Commandes from "./pages/usersPages/Commandes";
import Notifications from "./pages/usersPages/Notifications";
import ProduitsFavoris from "./pages/usersPages/ProduitsFavoris";
import Statistiques from "./pages/usersPages/Statistiques";
import UserLayout from "./pages/usersPages/UserLayout";
import { CartProvider } from "./contexts/CartContext";
import AdminLayout from "./pages/adminPages/AdminLayout";
import Dashboard from "./pages/adminPages/Dashboard";
import ProduitListe from "./pages/adminPages/ProduitListe";
import ProduitUpdate from "./pages/adminPages/ProduitUpdate";
import ProduitDetails from "./pages/adminPages/ProduitDetails";
import ClientsDetails from "./pages/adminPages/ClientsDetails";
import ClientsListes from "./pages/adminPages/ClientsListes";
import FournisListes from "./pages/adminPages/FournisListes";
import FournisDetails from "./pages/adminPages/FournisDetails";
import VentesDetails from "./pages/adminPages/VentesDetails";
import VentesListes from "./pages/adminPages/VentesListes";
import AchatsListes from "./pages/adminPages/AchatsListes";
import AchatsStatistique from "./pages/adminPages/AchatsStatistique";
import Inscription from "./pages/adminPages/Inscription";
import ForgetPassword from "./pages/adminPages/ForgetPassword";
import OtpPages from "./pages/adminPages/OtpPages";
import Paramettre from "./pages/adminPages/Paramettre";



const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<PublicElement><Home /></PublicElement>} />
      <Route path="/login" element={<PublicElement><Login /></PublicElement>} />
      <Route path="/signup" element={<PublicElement><Signup /></PublicElement>} />

      {/* Routes utilisateur avec UserLayout */}
      <Route
        path="/user/*"
        element={
          <UserElement>
            <UserLayout darkMode={true} />
          </UserElement>
        }
      >
        {/* Routes imbriquées */}
        <Route index element={<UserPages />} /> {/* Route par défaut */}
        <Route path="commandes" element={<Commandes />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="produits-favoris" element={<ProduitsFavoris />} />
        <Route path="statistiques" element={<Statistiques />} />
      </Route>
      <Route path="/myProfile" element={<UserElement><Profile /></UserElement>} />

      {/* Routes admin */}
      <Route
        path="/admin/*"
        element={
          <AdminElement>
            <AdminLayout />
          </AdminElement>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products/list" element={<ProduitListe />} />
        <Route path="products/details" element={<ProduitDetails/>} />
        <Route path="products/upload" element={<ProduitUpdate/>} />
        <Route path="clients/list" element={<ClientsListes />} />
        <Route path="clients/details" element={<ClientsDetails />} />
        <Route path="suppliers/list" element={<FournisListes />} />
        <Route path="suppliers/details" element={<FournisDetails />} />
        <Route path="ventes/list" element={<VentesListes />} />
        <Route path="ventes/details" element={<VentesDetails />} />
        <Route path="achats/list" element={<AchatsListes />} />
        <Route path="achats/statistique" element={<AchatsStatistique />} />
        <Route path="setting" element={<Paramettre />} />
        <Route path="inscription" element={<Inscription /> } />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="otp-pages" element={<OtpPages />} />
      </Route>

      {/* Route pour capturer les erreurs 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function PublicElement({ children }) {
  return <>{children}</>;
}

function UserElement({ children }) {
  const { userType } = useAuth();
  return userType === USER_TYPES.NORMAL_USER || userType === USER_TYPES.ADMIN_USER
    ? children
    : <Navigate to="/" replace />;
}

function AdminElement({ children }) {
  const { userType } = useAuth();
  return userType === USER_TYPES.ADMIN_USER
    ? children
    : <Navigate to="/" replace />;
}

export default App;