import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ProductGrid from './ProductGrid';
import { Button } from '../components/ui/Button';
import { Rings } from 'react-loader-spinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => handlePageChange(index + 1),
  };

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
            <Slider {...sliderSettings}>
              {Array.from({ length: totalPages }, (_, index) => (
                <div key={index}>
                  <ProductGrid products={filteredProducts.slice(index * itemsPerPage, (index + 1) * itemsPerPage)} />
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* Section Témoignages */}
        <div className="bg-gray-200 py-16 text-center">
          <h2 className="text-3xl font-bold">Ce que disent nos clients</h2>
          <div className="flex justify-center mt-8 space-x-4">
            {[
              { name: 'Alice', feedback: 'Super produits, je recommande !' },
              { name: 'Bob', feedback: 'Livraison rapide et service client au top.' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg italic">"{testimonial.feedback}"</p>
                <p className="mt-4 text-right font-bold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
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