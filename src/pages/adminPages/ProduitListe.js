import React, { useState } from 'react';
import Modal from "react-modal"; // Importation du modal
import { motion, AnimatePresence } from 'framer-motion';
import { FcFilledFilter } from "react-icons/fc";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { BiReset, BiImport } from "react-icons/bi";
import { PiExportBold } from "react-icons/pi";
import { TiEdit } from "react-icons/ti";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";




const ProduitListe = () => {
  // Données initiales des produits
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Produit A', categorie: 'Fruits & Vegetables', prix: '450.00 €', stock: 313228, statut: 'Selling', published: true },
    { id: 2, nom: 'Himalaya Powder', categorie: 'Skin Care', prix: '174.97 €', stock: 5472, statut: 'Selling', published: false },
    { id: 3, nom: 'Green Leaf Lettuce', categorie: 'Fresh Vegetable', prix: '112.72 €', stock: 463, statut: 'Selling', published: true },
  ]);

  // États pour la recherche, la pagination et les actions
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Nombre d'éléments par page
  const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné pour suppression
  const [isFormOpen, setIsFormOpen] = useState(false); // Formulaire d'ajout/modification

  // Filtrage des produits en fonction de la recherche
  const filteredProduits = produits.filter((produit) =>
    produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProduits.length / itemsPerPage);
  const paginatedProduits = filteredProduits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Suppression d'un produit
  const confirmDelete = () => {
    setProduits(produits.filter((produit) => produit.id !== selectedProduct.id));
    setSelectedProduct(null);
  };

  // Ajout d'un produit (exemple simple)
  const handleAddProduct = () => {
    setIsFormOpen(true);
  };
  // Fonction pour fermer le modal
  const closeModal = () => setIsFormOpen(false);

  const handleSaveProduct = (newProduct) => {
    setProduits([...produits, { id: produits.length + 1, ...newProduct }]);
    setIsFormOpen(false);
  };

  // Gestion de l'état de publication
  const togglePublish = (id) => {
    setProduits(
      produits.map((produit) =>
        produit.id === id ? { ...produit, published: !produit.published } : produit
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-700">
      {/* Barre d'actions */}
      <div className="flex justify-between items-center mb-6 bg-gray-200 p-5 rounded-lg">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-300 flex items-center gap-2">
            <PiExportBold />
            Export
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-300 flex items-center gap-2">
            <BiImport />
            Import
          </button>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-300 flex items-center gap-2">
            <TiEdit />
            Bulk Action
          </button>
          <button 
          className="px-4 py-2 bg-red-500 text-white
           rounded-md hover:bg-red-400 flex items-center gap-2"
           onClick={confirmDelete}>
            <AiOutlineDelete />
            Delete
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400 flex items-center gap-2"
            onClick={handleAddProduct}
          >
            <AiOutlinePlus />
            Add Product
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6 bg-gray-200 p-3 rounded-lg">
        <input
          type="text"
          placeholder="Search Product"
          className="px-4 py-2 bg-white border border-gray-300 rounded-md w-[60%] placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600">
          <option>Category</option>
          <option>Fruits & Vegetables</option>
          <option>Skin Care</option>
        </select>
        <select className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600">
          <option>Price</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 flex items-center gap-2">
          <FcFilledFilter />
          Filter
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex items-center gap-2">
          <BiReset />
          Reset
        </button>
      </div>

      {/* Tableau des produits */}
      <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Published</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProduits.map((produit) => (
            <motion.tr
              key={produit.id}
              className="border-t border-gray-200 hover:bg-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <td className="px-4 py-2">{produit.nom}</td>
              <td className="px-4 py-2">{produit.categorie}</td>
              <td className="px-4 py-2">{produit.prix}</td>
              <td className="px-4 py-2">{produit.stock}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-md ${produit.statut === 'Selling' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                  {produit.statut}
                </span>
              </td>
              <td className="px-4 py-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={produit.published}
                    onChange={() => togglePublish(produit.id)}
                  />
                  <div
                    className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-300 ${produit.published ? 'bg-green-500' : 'bg-red-500'
                      }`}
                  ></div>
                  <div
                    className={`w-4 h-4 bg-slate-300 rounded-full shadow transform transition-transform duration-300 ${produit.published ? 'translate-x-4' : 'translate-x-0'
                      }`}
                  ></div>
                </label>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400">
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-400"
                  onClick={() => setSelectedProduct(produit)}
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {currentPage} of {totalPages} pages
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 gap-2 flex items-center"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <GrLinkPrevious  />
            Previous
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <GrLinkNext />
          </button>
        </div>
      </div>
      {/* Modale*/}


      {/* formulaire pour ajouter produit*/}
      <Modal
              isOpen={isFormOpen}
              onRequestClose={closeModal}
              contentLabel="Confirmation de Déconnexion"
              className={'modal-content p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-40 '}
              overlayClassName="modal-overlay fixed inset-0  bg-opacity-50 flex justify-center items-center"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">
                  Voulez-vous vraiment vous déconnecter ?
                </h2>
                <p className="mb-6">Vous serez redirigé vers la page d'accueil après la déconnexion.</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={closeModal}
                    className={'px-4 py-2 rounded transition'}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className={'px-4 py-2 rounded transition '}
                  >
                    Oui
                  </button>
                </div>
              </div>
            </Modal>
    </div>
  );
};

export default ProduitListe;