import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Importation du modal
import { useAuth, USER_TYPES } from "../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import { ShoppingCart, User } from "lucide-react";
import AdminPanel from "./AdminPanel";
import { useCart } from "../contexts/CartContext";

Modal.setAppElement("#root"); // Configuration obligatoire pour react-modal

const NavBar = () => {
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
    navigate("/"); // Redirection après déconnexion
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white shadow-md">
      <div className="navbar flex items-center justify-between p-4 w-full overflow-hidden">
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
              {/* <Link to="/" className={isActive("/")}>Home</Link> */}
              <Link to="/user" className={isActive("/user")}>User Dashboard</Link>
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

              {/* Bouton Déconnexion qui ouvre le modal */}
              <button 
                onClick={openModal} 
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </>
          )}

          {userType === USER_TYPES.ADMIN_USER && <AdminPanel />}

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
        className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-40"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold text-gray-700">Voulez-vous vraiment vous déconnecter ?</h2>
        <div className="flex justify-end mt-4 space-x-2">
          <button 
            onClick={closeModal} 
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
            Annuler
          </button>
          <button 
            onClick={confirmLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Se Déconnecter
          </button>
        </div>
      </Modal>
        {/* Menu secondaire (affiché sur grand écran, caché sur mobile) */}
        <div className="bg-[rgb(110,110,210)] text-white py-2 flex justify-center space-x-6 hidden md:flex">
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
      <div className="bg-gray-100 py-2 flex justify-center space-x-4 text-black">
        <button onClick={() => navigate("/")} className={isActive("/")}>
          Accueil
        </button>
        <button onClick={() => navigate("/jardin-animalerie")} className={isActive("/jardin-animalerie")}>
          Jardin Animalerie
        </button>
        <button onClick={() => navigate("/informatique")} className={isActive("/informatique")}>
          Informatique
        </button>
        <button onClick={() => navigate("/electromenager")} className={isActive("/electromenager")}>
          Électroménager
        </button>
        <button onClick={() => navigate("/meuble-deco")} className={isActive("/meuble-deco")}>
          Meuble Déco
        </button>
        <button onClick={() => navigate("/mode-bijoux")} className={isActive("/mode-bijoux")}>
          Mode Bijoux
        </button>
        <button onClick={() => navigate("/jeux-video")} className={isActive("/jeux-video")}>
          Jeux Vidéo
        </button>
        <button onClick={() => navigate("/bebe")} className={isActive("/bebe")}>
          Bébé
        </button>
      </div>
      {isCartPopupOpen && (
        <div className="absolute top-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-800">Mon Panier</h2>
            <button onClick={closeCartPopup} className="text-gray-500 hover:text-gray-800">✖</button>
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