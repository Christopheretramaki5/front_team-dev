import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { BiShoppingBag, BiUser } from "react-icons/bi";
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaShoppingCart } from "react-icons/fa";
import ProdImg from "./prod.png"
import { Button } from "@mui/material";


const ProduitDetails = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Données simulées
  const produits = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    nom: "Ensemble haut et jupe pour femme",
    desc: "Ensemble haut et jupe pour femme",
    image: ProdImg, // Remplace avec une vraie image
    categorie: "Femmes",
    marque: "Homme riche",
    prix: 21.0,
    anciennePrix: 21.99,
    notation: 4.5,
    commandes: 350,
  }));

  // Filtrage par recherche
  const filteredProduits = produits.filter((produit) =>
    produit.nom.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProduits.length / itemsPerPage);
  const displayedProduits = filteredProduits.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  // const carte
  const cards = [
    { title: "Total Users", value: 277, subtitle: "Last Month", color: "bg-green-500", icon: <BiUser className="w-8 h-8 text-white/80" /> },
    { title: "Total Users", value: 277, subtitle: "Last Month", color: "bg-pink-500", icon: <FaShoppingCart className="w-8 h-8 text-white/80" /> },
    { title: "Total Users", value: 277, subtitle: "Last Month", color: "bg-blue-500", icon: <BiShoppingBag className="w-8 h-8 text-white/80" /> }
  ];

  return (
    <div>
      {/* Cartes utilisateurs en 2 lignes de 2 colonnes */}
      <div className="flex justify-between gap-6 col-span-2 mb-4">
        {cards.map((card, index) => (
          <div key={index} className={`${card.color} p-5 w-[35%] rounded-xl shadow-lg text-white flex flex-col justify-between`}>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">{card.title}</h3>
              {card.icon}
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-75">{card.subtitle}</p>
              <MoreVertical className="text-white/50 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <div className=" bg-white rounded-t-2xl border-t">

        {/* Barre de recherche */}
        <div className="flex justify-between items-center mb-3 px-3 py-2 ">
          <h2 className="text-lg font-semibold">Produits les plus vendus</h2>
          <div className="flex justify-between gap-2">
            <input
              type="text"
              placeholder="Rechercher ici..."
              className="border px-4 py-2 rounded-md shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600">
              <option>10</option>
              <option>9</option>
              <option>8</option>
              <option>7</option>
              <option>6</option>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </div>
        </div>


        {/* Tableau des produits */}
        <div className="bg-white shadow-md  overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Case</th>
                <th className="p-3">Produit</th>
                <th className="p-3">Catégorie</th>
                <th className="p-3">Marque</th>
                <th className="p-3">Prix</th>
                <th className="p-3">Notation</th>
                <th className="p-3">Commandes</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProduits.map((produit) => (
                <tr key={produit.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">Case</td>
                  <td className="p-3 flex items-center space-x-3">
                    <img src={produit.image} alt="Produit" className="w-12 h-12" />
                    <div className="grid">
                    <strong>{produit.nom}</strong>
                    <span>{produit.desc}</span>
                    </div>
                  </td>
                  <td className="p-3">{produit.categorie}</td>
                  <td className="p-3">{produit.marque}</td>
                  <td className="p-3">
                    <strong className="text-red-500 line-through">${produit.anciennePrix}</strong>{" "}
                    <span className="font-semibold text-black">${produit.prix}</span>
                  </td>
                  <td className="p-3">{produit.notation} ⭐</td>
                  <td className="p-3">{produit.commandes}</td>
                  <td className="p-3 flex space-x-2">
                    <button className="text-blue-500">
                      <FaEye />
                    </button>
                    <button className="text-green-500">
                      <FaEdit />
                    </button>
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center">
        <p className="text-gray-600">
          Page {page} sur {totalPages}
        </p>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white"}`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <FaChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md ${page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 rounded-md ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white"}`}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduitDetails;
