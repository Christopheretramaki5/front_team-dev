import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, USER_TYPES } from "../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const { userType, logout } = useAuth();
  const location = useLocation(); // Récupère l'URL actuelle
  const cartItemCount = 3; // Remplacez par une variable dynamique selon votre logique

  // Fonction pour vérifier si le lien est actif
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <div className="navbar flex items-center justify-between bg-blue-600 text-white p-4 shadow-md w-full overflow-hidden">
      <div className="logo text-xl font-bold">E-Shop</div>

      {/* Barre de recherche centrée avec icône */}
      <div className="flex-grow flex justify-center">
        <div className="relative w-1/3">
          <input 
            type="text" 
            placeholder="Rechercher des produits..." 
            className="w-full p-2 pl-10 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="nav-links flex items-center gap-4">
        {userType === USER_TYPES.NORMAL_USER && (
          <>
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/user" className={isActive("/user")}>User Dashboard</Link>
            <Link to="/myProfile" className={isActive("/myProfile")}>Profile</Link>
            {/* Icône Panier avec notification */}
            <div className="relative cursor-pointer">
              <div className="cart-icon text-2xl">🛒</div>
              {cartItemCount > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </div>
              )}
            </div>
            <button onClick={logout} className="logout-button bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        )}

        {userType === USER_TYPES.ADMIN_USER && (
          <>
            <Link to="/admin" className={isActive("/admin")}>Admin Dashboard</Link>
            <Link to="/myProfile" className={isActive("/myProfile")}>Profile</Link>
            <button onClick={logout} className="logout-button bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        )}

        {userType === USER_TYPES.PUBLIC && (
          <>
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/login" className={isActive("/login")}>
              <span className="flex items-center gap-1">
                <span className="text-xl">👤</span>
                <span>My Profile</span>
              </span>
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default NavBar;
