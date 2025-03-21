import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { motion } from 'framer-motion';

const ProductGrid = ({ products, isDarkMode }) => {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}  // Animation de départ
          animate={{ opacity: 1, scale: 1 }}    // Animation une fois la carte visible
          transition={{ duration: 0.5 }}         // Durée de l'animation
        >
          <Card className="shadow-md rounded-2xl overflow-hidden border">
            <CardContent className="p-4">
              {/* Image du produit */}
              <img
                src={product.image}
                alt={`Image de ${product.name}`}
                className="w-full h-40 object-cover rounded-lg"
              />
              
              {/* Nom du produit */}
              <h2 className="text-lg font-bold mt-4">{product.name}</h2>
              
              {/* Description du produit */}
              <p className="text-gray-500 text-sm mt-2 truncate">{product.description}</p>
              
              {/* Prix du produit */}
              <p className={`font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-red-500'}`}>
                {product.price}
              </p>

              {/* Détails supplémentaires */}
              <div className="flex items-center gap-2 mt-3">
                <Badge className="bg-blue-100 text-[hsl(240,70%,68%)] px-2 py-1 rounded-lg text-xs">
                  {product.verifiedYears} ans
                </Badge>
                <img
                  src={product.countryFlag}
                  alt={`${product.seller}`}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-gray-600 text-xs">{product.seller}</span>
              </div>

              {/* Bouton avec animation */}
              <motion.button
                className="mt-6 w-full bg-[rgb(110,110,210)] text-white hover:bg-[hsl(240,70%,68%)] p-1 rounded-lg"
                whileHover={{ scale: 1.1 }}         // Animation lors du survol
                whileTap={{ scale: 0.95 }}          // Animation lors du clic
              >
                Contacter le fournisseur
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
