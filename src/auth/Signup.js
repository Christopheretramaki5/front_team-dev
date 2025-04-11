import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    
    const validateForm = () => {
        if (!username) {
            toast.error("Nom d'utilisateur requis");
            return false;
        }
    
        if (!email) {
            toast.error("Email requis");
            return false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error("Email invalide");
                return false;
            }
        }
    
        if (!password) {
            toast.error("Mot de passe requis");
            return false;
        }
    
        if (!confirmPassword) {
            toast.error("Confirmer le mot de passe");
            return false;
        }
    
        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return false;
        }
    
        return true; // Si tout est valide
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        const toastId = toast.loading("Inscription en cours..."); // Affiche un toast de chargement
    
        try {
            // Simuler une inscription réussie
            setTimeout(() => {
                toast.update(toastId, {
                    render: "Inscription réussie ! Redirection...",
                    type: "success",
                    isLoading: false, // Désactive l'état de chargement
                    autoClose: 5000,
                });
                navigate("/login");
            }, 2000);
        } catch (error) {
            toast.update(toastId, {
                render: "Erreur lors de l'inscription : " + error.message,
                type: "error",
                isLoading: false, // Désactive l'état de chargement
                autoClose: 5000,
            });
        }
    };

    //   logique pour afficher/masquer le mot de passe
    const handleShowPasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    return (
        <div className="flex items-center justify-center min-h-[100vh] bg-gradient-to-r from-gray-50 to-gray-50 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <FaUser className="text-blue-600 text-4xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-700">CUSTOMER SIGNUP</h2>

                <form onSubmit={handleSubmit} className="mt-3 text-left">
                    <div className="flex items-center border rounded-lg px-3 py-2">
                        <FaUser className="text-gray-400 mr-2" />
                        <input type="text" className="w-full outline-none" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="flex items-center border rounded-lg px-3 py-2 mt-4">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <input type="email" className="w-full outline-none" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex items-center border rounded-lg px-3 py-2 mt-4">
                        <FaLock className="text-gray-400 mr-2" />
                        <input type={showPassword ? "text" : "password"} className="w-full outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex items-center border rounded-lg px-3 py-2 mt-4">
                        <FaLock className="text-gray-400 mr-2" />
                        <input type={showPassword ? "text" : "password"} className="w-full outline-none" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="flex justify-between items-center text-sm mt-4">
                        <div>
                            <input
                                type="checkbox"
                                id="showPassword"
                                className="mr-2"
                                checked={showPassword}
                                onChange={handleShowPasswordToggle}
                            />
                            <label htmlFor="showPassword" className="text-gray-600">Afficher mot de passe</label>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-6">
                        SIGN UP
                    </button>

                    {/* Lien vers la page de connexion */}
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Déjà un compte? </span>
                        <a href="/login" className="text-blue-500 hover:underline">Se connecter</a>
                    </div>
                </form>
            </div>

            {/* Notification Toast (messages d'erreur, succès, etc.) */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );

};

export default SignupPage;
