import React, { useState } from "react";
import { FaSearch, FaEye, FaTrashAlt, FaEdit, FaHashtag, FaCalendarAlt, FaEuroSign } from "react-icons/fa";

const Commandes = () => {
  // Exemple de données de commandes
  const [orders, setOrders] = useState([
    { id: "12345", status: "Livrée", date: "2025-03-20", total: "50€" },
    { id: "12346", status: "En cours", date: "2025-03-21", total: "75€" },
    { id: "12347", status: "Annulée", date: "2025-03-19", total: "30€" },
    { id: "12348", status: "Livrée", date: "2025-03-18", total: "100€" },
    { id: "12349", status: "En cours", date: "2025-03-22", total: "60€" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.date.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(
    orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.date.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / ordersPerPage
  );

  return (
    <div className="ml-60 p-4  text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Commandes</h1>

      {/* Barre de recherche */}
      <div className="flex mb-6">
        <div className="relative w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500 dark:text-gray-300" />
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
      {/* Tableau des commandes */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4 text-sm font-semibold">
                <FaHashtag className="inline mr-2" /> ID
              </th>
              <th className="p-4 text-sm font-semibold">
                <FaEye className="inline mr-2" /> Statut
              </th>
              <th className="p-4 text-sm font-semibold">
                <FaCalendarAlt className="inline mr-2" /> Date
              </th>
              <th className="p-4 text-sm font-semibold">
                <FaEuroSign className="inline mr-2" /> Total
              </th>
              <th className="p-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 transition-colors`}
              >
                <td className="p-4 text-gray-700">{order.id}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Livrée"
                        ? "bg-green-100 text-green-600"
                        : order.status === "En cours"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{order.date}</td>
                <td className="p-4 text-gray-800 font-semibold">{order.total}</td>
                <td className="p-4 flex gap-2">
                  {/* Bouton Détails */}
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center text-blue-500 bg-blue-300 p-1 px-4 rounded-md font-semibold hover:underline"
                  >
                    <FaEye className="mr-2" /> Détails
                  </button>
                  {/* Bouton Modifier */}
                  <button className="flex items-center text-yellow-500 bg-yellow-300 p-1 px-4 rounded-md font-semibold hover:underline">
                    <FaEdit className="mr-2" /> Modifier
                  </button>
                  {/* Bouton Supprimer */}
                  <button className="flex items-center text-red-500 bg-red-300 p-1 px-4 rounded-md font-semibold hover:underline">
                    <FaTrashAlt className="mr-2" /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>

      {/* Modale pour les détails */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-6 rounded-lg shadow-lg bg-white text-gray-800">
            <h2 className="text-xl font-bold mb-4">Détails de la commande</h2>
            <p>ID : {selectedOrder.id}</p>
            <p>Statut : {selectedOrder.status}</p>
            <p>Date : {selectedOrder.date}</p>
            <p>Total : {selectedOrder.total}</p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commandes;