import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ProductGrid from './ProductGrid';
import { Button } from '../components/ui/Button';
import { Rings } from 'react-loader-spinner';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const itemsPerPage = 8;

  // Simulation des produits
  const products = Array(20).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Produit ${index + 1}`,
    description: `Description du produit ${index + 1}`,
    price: `${(Math.random() * 1000).toFixed(2)} €`,
    image: 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Logiciel'
  }));

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? product.category === categoryFilter : true)
  );

  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 pt-40 flex">
      {/* Sidebar Filtrante */}
      <div className="w-1/5 bg-white p-6 shadow-md h-screen sticky top-0 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Catégories</h2>
        <input 
          type="text" 
          placeholder="Recherche..." 
          className="w-full p-2 border border-gray-300 rounded-lg mb-4" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          <option value="Logiciel">Logiciel</option>
        </select>
      </div>

      {/* Contenu Principal */}
      <div className="w-4/5">
        {/* Barre de Navigation collante */}
        <div className="sticky top-0 z-20 bg-white shadow-md">
          <NavBar />
        </div>

        {/* Section Bannière */}
        <div className="bg-[rgb(110,110,210)] text-white py-10 text-center">
          <h1 className="text-4xl font-bold">Bienvenue sur notre boutique en ligne</h1>
          <p className="mt-4 text-lg">Découvrez nos produits exclusifs dès maintenant !</p>
          <Button className="mt-6 bg-white text-[#7777ef] hover:bg-gray-200">Voir les produits</Button>
        </div>

        {/* Section Produits */}
        <div className="p-8">
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <Rings color="#7777ef" height={60} width={60} />
            </div>
          ) : (
            <ProductGrid products={displayedProducts} />
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 mb-8">
          <Button
            className="mx-1 bg-gray-200 text-black"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              className={`mx-1 ${currentPage === index + 1 ? 'bg-[#7777ef] text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            className="mx-1 bg-gray-200 text-black"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>

        {/* Section Informations */}
        <div className="bg-gray-200 py-16 text-center">
          <h2 className="text-3xl font-bold">Pourquoi nous choisir ?</h2>
          <p className="mt-4 text-lg text-gray-600">Nous offrons les meilleurs produits aux meilleurs prix.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
