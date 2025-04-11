import React, { useState } from "react";
import { FaSearch, FaTrashAlt, FaCheckCircle } from "react-icons/fa";

const Notifications = () => {
  // Exemple de données de notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Votre commande #12345 a été livrée.", status: "non-lue" },
    { id: 2, message: "Nouvelle promotion sur les produits électroniques.", status: "non-lue" },
    { id: 3, message: "Votre commande #12346 est en cours de traitement.", status: "lue" },
    { id: 4, message: "Message de l'administrateur : Maintenance prévue demain.", status: "non-lue" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Fonction pour marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: "lue" } : notif
      )
    );
  };

  // Fonction pour supprimer une notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Notifications filtrées par la barre de recherche
  const filteredNotifications = notifications.filter((notif) =>
    notif.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-60 p-4">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      {/* Barre de recherche */}
      {/* <div className="mb-4">
        <div className="relative w-[35%] ">
          <FaSearch className="absolute left-3 top-5 text-gray-500" />
         
          <input
            type="text"
            placeholder="Rechercher une notification..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div> */}
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

      {/* Liste des notifications */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center ${notif.status === "non-lue"
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : "bg-gray-100"
                }`}
            >
              <div>
                <p
                  className={`text-sm ${notif.status === "non-lue" ? "font-bold text-blue-800" : "text-gray-600"
                    }`}
                >
                  {notif.message}
                </p>
              </div>
              <div className="flex gap-2">
                {notif.status === "non-lue" && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-green-500 hover:text-green-700"
                    title="Marquer comme lue"
                  >
                    <FaCheckCircle />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Supprimer"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucune notification trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;