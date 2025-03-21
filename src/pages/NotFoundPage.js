import React from 'react'
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[rgb(110,110,210)] mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Page non trouvée</h2>
        <p className="mb-6 text-gray-500">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="px-6 py-2 text-white bg-[rgb(110,110,210)] rounded-lg hover:bg-[#7777ef] transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;