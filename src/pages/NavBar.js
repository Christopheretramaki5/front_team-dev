import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, USER_TYPES } from "../contexts/AuthContext";

const NavBar = () => {
  const { userType, logout } = useAuth();
  const location = useLocation(); // Récupère l'URL actuelle

  // Fonction pour vérifier si le lien est actif
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <div className="navbar">
      {/* Liens pour les utilisateurs connectés */}
      {userType === USER_TYPES.NORMAL_USER && (
        <>
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/user" className={isActive("/user")}>User Dashboard</Link>
          <Link to="/myProfile" className={isActive("/myProfile")}>Profile</Link>
          <button onClick={logout} className="logout-button">Logout</button>
        </>
      )}

      {userType === USER_TYPES.ADMIN_USER && (
        <>
          <Link to="/admin" className={isActive("/admin")}>Admin Dashboard</Link>
          <Link to="/myProfile" className={isActive("/myProfile")}>Profile</Link>
          <button onClick={logout} className="logout-button">Logout</button>
        </>
      )}

      {/* Liens pour les utilisateurs non connectés */}
      {userType === USER_TYPES.PUBLIC && (
        <>
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/login" className={isActive("/login")}>Login</Link>
          <Link to="/signup" className={isActive("/signup")}>Signup</Link>
        </>
      )}

      {/* Affichage du rôle actuel */}
      <div className="user-type">Connecté en tant que : {userType || "Not logged in"}</div>
    </div>
  );
};

export default NavBar;
