import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Importation du modal
import { useAuth, USER_TYPES } from "../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import AdminLayout from "./adminPages/AdminLayout";

Modal.setAppElement("#root"); // Configuration obligatoire pour react-modal

const NavBar = ({ darkMode }) => {
  const { userType, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = cart.length;
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'affichage du modal
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);

  // Gestion de la popup du panier
  const toggleCartPopup = () => setIsCartPopupOpen(!isCartPopupOpen);
  const closeCartPopup = () => setIsCartPopupOpen(false);

  useEffect(() => {
    console.log("🔄 Mise à jour de NavBar - UserType:", userType);
  }, [userType]);

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  // Fonction pour ouvrir le modal
  const openModal = () => setIsModalOpen(true);

  // Fonction pour fermer le modal
  const closeModal = () => setIsModalOpen(false);

  // Fonction pour confirmer la déconnexion
  const confirmLogout = () => {
    logout();
    setIsModalOpen(false);
    toast.success("Déconnexion réussie !", {
      className: "text-green-500 font-bold",
      autoClose: 3000,
    });
    navigate("/"); // Redirection après déconnexion
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-blue-600 text-white"
      }`}
    >
      <div className="navbar flex items-center justify-between p-4 w-full overflow-hidden -mr-8">
        <div className="logo text-xl font-bold">E-Shop</div>

        {/* Barre de recherche centrée avec icône */}
        <div className="flex-grow flex justify-center">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className={`w-full p-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-blue-400"
                  : "bg-white text-black border-gray-300 focus:ring-blue-500"
              }`}
            />
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>

        <div className="nav-links flex items-center gap-4">
          {userType === USER_TYPES.NORMAL_USER && (
            <>
              <Link to="/user" className={isActive("/user")}>
                User Dashboard
              </Link>
              <Link to="/myProfile" className={isActive("/myProfile")}>
                <span className="flex items-center gap-1">
                  <User size={20} />
                  <span>Profile</span>
                </span>
              </Link>

              {/* Icône Panier avec notification */}
              <div className="relative cursor-pointer">
                <ShoppingCart size={28} onClick={toggleCartPopup} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>

              {/* Bouton Déconnexion */}
              <button
                onClick={openModal}
                className={`px-3 py-1 rounded transition ${
                  darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Logout
              </button>
            </>
          )}

          {userType === USER_TYPES.ADMIN_USER && <AdminLayout />}

          {userType === USER_TYPES.PUBLIC && (
            <Link to={"/login"}>
              <span className="flex items-center gap-1">
                <User size={20} />
                <span>Connectez-vous</span>
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* MODAL de confirmation de déconnexion */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation de Déconnexion"
        className={`modal-content p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-40 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Voulez-vous vraiment vous déconnecter ?
          </h2>
          <p className="mb-6">Vous serez redirigé vers la page d'accueil après la déconnexion.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={closeModal}
              className={`px-4 py-2 rounded transition ${
                darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Non
            </button>
            <button
              onClick={confirmLogout}
              className={`px-4 py-2 rounded transition ${
                darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Oui
            </button>
          </div>
        </div>
      </Modal>

      {/* Menu secondaire */}
      <div
        className={`py-2 flex justify-center space-x-6 hidden md:flex ${
          darkMode ? "bg-gray-700 text-gray-300" : "bg-[rgb(110,110,210)] text-white"
        }`}
      >
        <button onClick={() => navigate("/promo")} className={isActive("/promo")}>
          Promo
        </button>
        <button onClick={() => navigate("/voyages")} className={isActive("/voyages")}>
          Voyages
        </button>
        <button onClick={() => navigate("/forfait-mobile")} className={isActive("/forfait-mobile")}>
          Forfait Mobile
        </button>
        <button onClick={() => navigate("/reconditionne")} className={isActive("/reconditionne")}>
          Reconditionné
        </button>
        <button onClick={() => navigate("/paiement-10x")} className={isActive("/paiement-10x")}>
          Paiement 10x
        </button>
        <button onClick={() => navigate("/programme-fidelite")} className={isActive("/programme-fidelite")}>
          Achats
        </button>
      </div>

      {/* Menu de catégories */}
      <div
        className={`py-2 flex justify-center space-x-4 ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-black"
        }`}
      >
        <button onClick={() => navigate("/")} className={isActive("/")}>
          Accueil
        </button>
        <button onClick={() => navigate("/jardin-animalerie")} className={isActive("/jardin-animalerie")}>
          Fashion
        </button>
        <button onClick={() => navigate("/informatique")} className={isActive("/informatique")}>
          Electrinics
        </button>
        <button onClick={() => navigate("/electromenager")} className={isActive("/electromenager")}>
          Groceries
        </button>
        <button onClick={() => navigate("/meuble-deco")} className={isActive("/meuble-deco")}>
          Home & kitchen
        </button>
        <button onClick={() => navigate("/mode-bijoux")} className={isActive("/mode-bijoux")}>
          Beauty & Health
        </button>
        <button onClick={() => navigate("/jeux-video")} className={isActive("/jeux-video")}>
          Jewellery
        </button>
      </div>

      {isCartPopupOpen && (
        <div className="absolute top-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-800">Mon Panier</h2>
            <button onClick={closeCartPopup} className="text-gray-500 hover:text-gray-800">
              ✖
            </button>
          </div>

          {cartItemCount > 0 ? (
            <div>
              <p className="text-gray-600 mt-2">Vous avez {cartItemCount} article(s) dans votre panier.</p>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  navigate("/cart");
                  closeCartPopup();
                }}
              >
                Voir le Panier
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">Votre panier est vide.</p>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;