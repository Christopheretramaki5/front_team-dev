import React, { createContext, useState, useContext } from "react";

// Création du contexte du panier
const CartContext = createContext();

// Fournisseur du contexte pour partager l'état du panier
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Panier initialement vide

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]); // Ajout du produit au panier
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId)); // Retrait du produit du panier
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook pour accéder au panier dans n'importe quel composant
export const useCart = () => useContext(CartContext);
