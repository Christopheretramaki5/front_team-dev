import React from "react";
import { Outlet } from "react-router-dom"; // Importer Outlet pour les routes imbriquées
import Sidebar from "../../components/Sidebar";
import NavBar from "../NavBar";

const UserLayout = ({ darkMode }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar/>

      {/* Contenu principal */}
      <div className="w-full">
        {/* Navbar */}
        <NavBar />

        {/* Contenu principal avec un décalage pour la Navbar */}
        <div className="mt-24 w-full p-4 pt-16">
          <Outlet /> {/* Rendre les routes imbriquées ici */}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;