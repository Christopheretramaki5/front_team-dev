import React from "react";
import { Link } from "react-router-dom";
import { useAuth, USER_TYPES } from "../contexts/AuthContext";

const NavBar = () => {
  const { userType, logout } = useAuth(); // Récupérer la fonction logout

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 8,
        backgroundColor: "rgb(110,110,210)",
        color: "white",
        borderBottom: "1px solid red",
      }}
    >

      {/* Liens pour les utilisateurs connectés */}
      {userType === USER_TYPES.NORMAL_USER && (
        <>
          <Link to="/">Home</Link>
          <Link to="/user">User Dashboard</Link>
          <Link to="/myProfile">Profile</Link>
          <button onClick={logout} style={{ backgroundColor: "red", color: "white" }}>
            Logout
          </button>
        </>
      )}

      {userType === USER_TYPES.ADMIN_USER && (
        <>
          <Link to="/admin">Admin Dashboard</Link>
          <Link to="/myProfile">Profile</Link>
          <button onClick={logout} style={{ backgroundColor: "red", color: "white" }}>
            Logout
          </button>
        </>
      )}

      {/* Liens pour les utilisateurs non connectés */}
      {userType === USER_TYPES.PUBLIC && (
        <>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

      {/* Affichage du rôle actuel */}
      <div>You are logged in as: {userType || "Not logged in"}</div>
    </div>
  );
};

export default NavBar;
