import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search } from "lucide-react";
import { FcSms } from "react-icons/fc";
import { MdNotifications } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoSettings, IoLogOutSharp } from "react-icons/io5";
import profile from "./profile.jpg";
import profile1 from "./profile1.webp";
import profile2 from "./profile2.jpg";
import profile3 from "./profile3.jpg";
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

const TopBar = () => {
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isMessageMenuOpen, setIsMessageMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  // Définir des notifications et messages avec des images de profil pour les expéditeurs
  const [notifications] = useState([
    { id: 1, text: "Nouvelle mise à jour disponible", senderImage: profile1 },
    { id: 2, text: "Votre commande a été expédiée", senderImage: profile2 },
    { id: 3, text: "Un nouvel utilisateur vous a suivi", senderImage: profile3 }
  ]);

  const [messages] = useState([
    { id: 1, sender: "John Doe", text: "Salut, comment ça va ?", senderImage: profile2 },
    { id: 2, sender: "Jane Smith", text: "Tu veux sortir ce soir ?", senderImage: profile3 },
    { id: 3, sender: "Alex", text: "Il faut qu'on parle du projet", senderImage: profile1 }
  ]);

  const [settings] = useState([
    { id: 1, text: "Changer le mot de passe" },
    { id: 2, text: "Notifications" },
    { id: 3, text: "Langue" }
  ]);

  const avatarRef = useRef(null);
  const notificationRef = useRef(null);
  const messageRef = useRef(null);
  const settingsRef = useRef(null);

  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
  };
  const toggleMessageMenu = () => {
    setIsMessageMenuOpen(!isMessageMenuOpen);
  };
  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };
  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsAvatarMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationMenuOpen(false);
      }
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setIsMessageMenuOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // bouton déconexion
  const { logout } = useAuth();
  const handleLogout = () => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous allez être déconnecté !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, déconnecter",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // 🔥 Appelle directement la fonction logout
      }
    });
  };

  return (
    <header className="flex items-center justify-between p-3 bg-white shadow-md relative">
      {/* Menu + Barre de recherche */}
      <div className="flex items-center flex-1 max-w-lg space-x-3">
        <Menu className="w-6 h-6 text-gray-600 cursor-pointer hover:text-black" />
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Rechercher votre page..."
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Icônes et avatars */}
      <div className="flex items-center space-x-6 ml-4 relative">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          {/* Icône de notification */}
          <div
            className="w-8 h-8 flex items-center justify-center bg-gray-200 shadow-md rounded-lg cursor-pointer hover:bg-gray-300"
            onClick={toggleNotificationMenu}
          >
            <MdNotifications className="w-6 h-6 text-blue-700" />
          </div>
          {/* Badge pour le nombre de notifications */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>

          {/* Menu déroulant des notifications */}
          {isNotificationMenuOpen && (
            <div className="absolute right-0 mt-2 min-w-[22rem] bg-white border rounded-lg shadow-lg py-2 z-50">
              {/* Triangle au-dessus du menu */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-300 transform rotate-45"></div>

              {/* Titre des notifications */}
              <div className="px-4 py-2 border-b ">
                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
              </div>

              {/* Liste des notifications */}
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-gray-100"
                >
                  {/* Image de l'expéditeur */}
                  <img
                    src={notification.senderImage}
                    alt="Sender"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  {/* Contenu de la notification */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-semibold">
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-500">Dec 12 2021 - 12:40PM</p>
                  </div>
                  {/* Indicateur de statut */}
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              ))}

              {/* Bouton pour voir toutes les notifications */}
              <div className="px-4 py-2 text-center">
                <button className="text-sm text-blue-600 hover:underline">
                  Voir toutes les notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative" ref={messageRef}>
          <div className="w-8 h-8 flex items-center justify-center bg-gray-200 shadow-md rounded-lg cursor-pointer hover:bg-gray-300" onClick={toggleMessageMenu}>
            <FcSms className="w-6 h-6 text-gray-600" />
          </div>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {messages.length}
          </span>
          {isMessageMenuOpen && (
            <div className="absolute right-0 mt-2 min-w-[12rem] bg-white border rounded-lg shadow-lg py-2 z-50">
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-300 transform rotate-45"></div>
              {messages.map((message) => (
                <div key={message.id} className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                  <img src={message.senderImage} alt="Sender" className="w-6 h-6 rounded-full mr-2" />
                  <span className="text-gray-600">{message.sender}: {message.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Paramètres */}
        <div className="relative" ref={settingsRef}>
          <div
            className="w-8 h-8 flex items-center justify-center bg-gray-200 shadow-md rounded-lg cursor-pointer hover:bg-gray-300"
            onClick={toggleSettingsMenu}
          >
            <IoSettings className="w-6 h-6 text-gray-600" />
          </div>
          {isSettingsMenuOpen && (
            <div className="absolute right-0 mt-2 min-w-[12rem] bg-white border rounded-lg shadow-lg py-2 z-50">
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-300 transform rotate-45"></div>
              {settings.map((setting) => (
                <button key={setting.id} className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                  <span className="text-gray-600">{setting.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Avatar avec menu déroulant */}
        <div className="relative" ref={avatarRef}>
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleAvatarMenu}
          />
          {isAvatarMenuOpen && (
            <div className="absolute right-0 mt-2 min-w-[12rem] bg-white border rounded-lg shadow-lg py-2 z-50">
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-300 transform rotate-45"></div>
              <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                <FaUser className="w-5 h-5 mr-2 text-blue-900 " /> Profil
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                <IoSettings className="w-5 h-5 mr-2 text-blue-900 " /> Paramètres
              </button>
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 border-l-red-500"
                onClick={handleLogout}
              >
                <IoLogOutSharp className="w-5 h-5 mr-2" /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
