import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { FaShoppingCart, FaHeart, FaBell, FaChartBar, FaSearch, FaUser, FaCalendarAlt, FaEuroSign } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import Modal from "react-modal";
import { Bar } from "react-chartjs-2";
import { QRCodeCanvas } from "qrcode.react";

Modal.setAppElement("#root");

const UserPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const user = {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
  };

  const orders = [
    { id: "12345", status: "Livrée", date: "2025-03-20", total: "50€" },
    { id: "12346", status: "En cours", date: "2025-03-21", total: "75€" },
    { id: "12347", status: "Annulée", date: "2025-03-19", total: "30€" },
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const chartData = {
    labels: ["Commandes Passées", "Commandes En Cours", "Commandes Annulées"],
    datasets: [
      {
        label: "Statistiques des Commandes",
        data: [15, 5, 2],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistiques des Commandes",
      },
    },
  };

  return (
    <div className="bg-gray-100 text-black ml-60">
      <div className="container mx-auto p-4">
        {/* Barre de recherche */}
        <div className="flex mb-6">
          <div className="relative w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-500" />
              <div className="h-5 w-px bg-gray-300 mx-3"></div>
            </div>
            <input
              type="text"
              placeholder="Rechercher une commande ou une notification..."
              className="w-full p-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Cartes en haut */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Commandes Récentes */}
          <Card className="p-2 shadow-lg rounded-2xl bg-blue-100 hover:shadow-xl transition h-[250px]">
            <CardContent className="h-full flex flex-col">
              <div className="flex items-center mb-2 sticky top-0 z-10 p-2">
                <FaShoppingCart className="text-blue-600 text-3xl mr-3" />
                <h2 className="text-xl font-bold text-blue-600 font-mono">Commandes Récentes</h2>
              </div>
              <div className="overflow-y-auto flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-blue-50 z-10">
                    <tr>
                      <th className="border-b p-2">ID</th>
                      <th className="border-b p-2">Statut</th>
                      <th className="border-b p-2">Date</th>
                      <th className="border-b p-2">Total</th>
                      <th className="border-b p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter(
                        (order) =>
                          order.id.toLowerCase().includes(searchQuery) ||
                          order.status.toLowerCase().includes(searchQuery)
                      )
                      .map((order) => (
                        <tr key={order.id}>
                          <td className="p-2">{order.id}</td>
                          <td className="p-2">{order.status}</td>
                          <td className="p-2">{order.date}</td>
                          <td className="p-2">{order.total}</td>
                          <td className="p-2">
                            <VscEye
                              className="text-blue-600 cursor-pointer hover:text-blue-800"
                              onClick={() => handleOrderClick(order)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Produits Favoris */}
          <Card className="shadow-lg rounded-2xl bg-pink-100 hover:shadow-xl transition h-[250px]">
            <CardContent className="h-full flex flex-col bg-pink-100">
              <div className="flex items-center mb-2 sticky top-0 z-10 bg-pink-100 p-2">
                <FaHeart className="text-pink-600 text-3xl mr-3" />
                <h2 className="text-xl font-bold text-pink-600">Produits Favoris</h2>
              </div>
              <div className="overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Produit 1 */}
                  <div className="flex flex-col items-center bg-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Produit 1"
                      className="w-20 h-20 rounded-lg mb-3"
                    />
                    <p className="font-bold text-gray-800">Produit 1</p>
                    <p className="text-sm text-gray-600">Prix : 20€</p>
                  </div>
                  {/* Produit 2 */}
                  <div className="flex flex-col items-center bg-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Produit 2"
                      className="w-20 h-20 rounded-lg mb-3"
                    />
                    <p className="font-bold text-gray-800">Produit 2</p>
                    <p className="text-sm text-gray-600">Prix : 35€</p>
                  </div>
                  {/* Produit 3 */}
                  <div className="flex flex-col items-center bg-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Produit 3"
                      className="w-20 h-20 rounded-lg mb-3"
                    />
                    <p className="font-bold text-gray-800">Produit 3</p>
                    <p className="text-sm text-gray-600">Prix : 50€</p>
                  </div>
                  {/* Produit 4 */}
                  <div className="flex flex-col items-center bg-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Produit 4"
                      className="w-20 h-20 rounded-lg mb-3"
                    />
                    <p className="font-bold text-gray-800">Produit 4</p>
                    <p className="text-sm text-gray-600">Prix : 40€</p>
                  </div>
                  {/* Produit 5 */}
                  <div className="flex flex-col items-center bg-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Produit 5"
                      className="w-20 h-20 rounded-lg mb-3"
                    />
                    <p className="font-bold text-gray-800">Produit 5</p>
                    <p className="text-sm text-gray-600">Prix : 60€</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="p-4 shadow-lg rounded-2xl bg-yellow-100 hover:shadow-xl transition h-[250px]">
            <CardContent className="h-full flex flex-col">
              <div className="flex items-center mb-2 sticky top-0 bg-yellow-100 z-10 p-2">
                <FaBell className="text-yellow-600 text-3xl mr-3" />
                <h2 className="text-xl font-bold text-yellow-600">Notifications</h2>
              </div>
              <div className="overflow-y-auto flex-grow">
                <ul className="space-y-4">
                  {/* Notification 1 */}
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <FaBell className="text-yellow-500 text-xl mr-3" />
                    <div>
                      <p className="font-bold text-gray-800">Nouvelle commande reçue</p>
                      <p className="text-sm text-gray-600">Il y a 2 heures</p>
                    </div>
                  </li>
                  {/* Notification 2 */}
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <FaBell className="text-yellow-500 text-xl mr-3" />
                    <div>
                      <p className="font-bold text-gray-800">Produit ajouté aux favoris</p>
                      <p className="text-sm text-gray-600">Il y a 1 jour</p>
                    </div>
                  </li>
                  {/* Notification 3 */}
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <FaBell className="text-yellow-500 text-xl mr-3" />
                    <div>
                      <p className="font-bold text-gray-800">Mise à jour du statut de commande</p>
                      <p className="text-sm text-gray-600">Il y a 3 jours</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cartes en bas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Profil Utilisateur */}
          <Card className="p-4 shadow-lg rounded-2xl bg-purple-100 hover:shadow-xl transition h-[350px]">
            <CardContent className="flex flex-col justify-between">
              <div className="flex items-center mb-4">
                <FaUser className="text-purple-600 text-3xl mr-3" />
                <h2 className="text-xl font-bold text-purple-600">Profil Utilisateur</h2>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Nom :</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email :</strong> {user.email}
                  </p>
                  <p>
                    <strong>Téléphone :</strong> {user.phone}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <QRCodeCanvas
                    value={JSON.stringify(user)}
                    size={100}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="Q"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">Scanner pour voir l'information</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="p-4 shadow-lg rounded-2xl bg-green-100 hover:shadow-xl transition h-[350px]">
            <CardContent>
              <div className="flex items-center mb-4">
                <FaChartBar className="text-green-600 text-3xl mr-3" />
                <h2 className="text-xl font-bold text-green-600">Statistiques</h2>
              </div>
              <Bar data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal pour afficher les détails de la commande */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onRequestClose={closeModal}
          contentLabel="Détails de la commande"
          className="modal-content relative bg-white p-6 rounded-2xl shadow-2xl max-w-lg mx-auto mt-40"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          >
            ✖
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Détails de la commande</h2>
            <div className="text-left space-y-4">
              <div className="flex items-center">
                <FaShoppingCart className="text-blue-500 text-xl mr-3" />
                <p>
                  <strong>ID :</strong> {selectedOrder.id}
                </p>
              </div>
              <div className="flex items-center">
                <FaBell className="text-yellow-500 text-xl mr-3" />
                <p>
                  <strong>Statut :</strong> {selectedOrder.status}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-green-500 text-xl mr-3" />
                <p>
                  <strong>Date :</strong> {selectedOrder.date}
                </p>
              </div>
              <div className="flex items-center">
                <FaEuroSign className="text-red-500 text-xl mr-3" />
                <p>
                  <strong>Total :</strong> {selectedOrder.total}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Fermer
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserPage;