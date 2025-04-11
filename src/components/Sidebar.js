import React from "react";
import { FaShoppingCart, FaBell, FaHeart, FaChartBar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();

  // Fonction pour vérifier si un lien est actif
  const isActive = (path) => {
    return location.pathname === path
      ? `bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500`
      : `text-gray-600 hover:bg-gray-200`;
  };

  return (
    <div className="w-64 h-screen fixed top-0 left-0 pt-40 shadow-lg overflow-y-auto bg-gray-100 text-gray-600">
      <ul className="space-y-4 p-4">
        {/* Lien vers Tableau de Bord */}
        <li>
          <Link
            to="/user"
            className={`flex items-center gap-4 p-3 rounded-lg transition ${isActive("/user")}`}
          >
            <RiDashboardFill className="text-xl text-blue-500" />
            <span>Tableau de Bord</span>
          </Link>
        </li>

        {/* Lien vers Commandes */}
        <li>
          <Link
            to="/user/commandes"
            className={`flex items-center gap-4 p-3 rounded-lg transition ${isActive("/user/commandes")}`}
          >
            <FaShoppingCart className="text-xl text-green-500" />
            <span>Commandes</span>
          </Link>
        </li>

        {/* Lien vers Notifications */}
        <li>
          <Link
            to="/user/notifications"
            className={`flex items-center gap-4 p-3 rounded-lg transition ${isActive("/user/notifications")}`}
          >
            <FaBell className="text-xl text-yellow-500" />
            <span>Notifications</span>
          </Link>
        </li>

        {/* Lien vers Produits Favoris */}
        <li>
          <Link
            to="/user/produits-favoris"
            className={`flex items-center gap-4 p-3 rounded-lg transition ${isActive("/user/produits-favoris")}`}
          >
            <FaHeart className="text-xl text-red-500" />
            <span>Produits Favoris</span>
          </Link>
        </li>

        {/* Lien vers Statistiques */}
        <li>
          <Link
            to="/user/statistiques"
            className={`flex items-center gap-4 p-3 rounded-lg transition ${isActive("/user/statistiques")}`}
          >
            <FaChartBar className="text-xl text-orange-500" />
            <span>Statistiques</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;