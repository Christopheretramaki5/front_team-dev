import React, { useState } from "react";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

const ProduitsFavoris = () => {
  // Exemple de données de produits favoris
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Produit A", description: "Description du produit A", price: "50€" },
    { id: 2, name: "Produit B", description: "Description du produit B", price: "75€" },
    { id: 3, name: "Produit C", description: "Description du produit C", price: "30€" },
    { id: 4, name: "Produit D", description: "Description du produit D", price: "100€" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Fonction pour supprimer un produit favori
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((product) => product.id !== id));
  };

  // Produits filtrés par la barre de recherche
  const filteredFavorites = favorites.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-60 p-4">
      <h1 className="text-3xl font-bold mb-6">Produits Favoris</h1>

      {/* Barre de recherche */}
      <div className="flex mb-6">
        <div className="relative w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500" />
            <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-3"></div>
          </div>
          <input
            type="text"
            placeholder="Rechercher une commande ou une notification..."
            className="w-full p-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des produits favoris */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold text-blue-600 mt-2">{product.price}</p>
              <button
                onClick={() => removeFavorite(product.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
              >
                <FaTrashAlt className="inline mr-2" /> Supprimer
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucun produit favori trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ProduitsFavoris;