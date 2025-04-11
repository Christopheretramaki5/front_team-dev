import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSignInAlt } from "react-icons/fa"; // Importer les icônes

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: false, password: false });
    const { login } = useAuth();
    const navigate = useNavigate();

    // State pour afficher/masquer le mot de passe
    const [showPassword, setShowPassword] = useState(false);

    //     e.preventDefault();

    //     let newErrors = { email: !email.trim(), password: !password.trim() };
    //     setErrors(newErrors);

    //     if (newErrors.email || newErrors.password) {
    //         toast.error("Tous les champs sont obligatoires !");
    //         return;
    //     }

    //     // Afficher le toast de chargement
    //     const toastId = toast.loading("Chargement de la page...");

    //     try {
    //         await login(email, password); // Connexion

    //         // Déterminer la route de redirection en fonction du rôle
    //         const userType = localStorage.getItem("userType"); // Récupérer le rôle

    //         let redirectPath = "/";
    //         if (userType === "Admin User") {
    //             redirectPath = "/admin";
    //         } else if (userType === "Normal User") {
    //             redirectPath = "/user";
    //         }

    //         // Mise à jour du toast pour indiquer le succès et rediriger
    //         toast.update(toastId, {
    //             render: "Connexion réussie!",
    //             type: "success",
    //             isLoading: false,
    //             autoClose: 5000,
    //         });

    //         setTimeout(() => navigate(redirectPath), 4000); // Redirection après succès
    //     } catch (error) {
    //         toast.error("⚠️ Identifiants incorrects !");
    //         setErrors({ email: true, password: true });
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation des champs
        let newErrors = { email: !email.trim(), password: !password.trim() };
        if (!email.trim() || !password.trim()) {
            toast.error("Tous les champs sont obligatoires !");
            setErrors(newErrors);
            return; // Arrête l'exécution si une erreur est détectée
        }

        // Vérification de la validité de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Email invalide !");
            setErrors({ email: true, password: false });
            return; // Arrête l'exécution si une erreur est détectée
        }

        // Si toutes les validations sont réussies, afficher le toast de chargement
        const toastId = toast.loading("Chargement de la page...");

        try {
            await login(email, password); // Connexion

            // Déterminer la route de redirection en fonction du rôle
            const userType = localStorage.getItem("userType"); // Récupérer le rôle

            let redirectPath = "/";
            if (userType === "Admin User") {
                redirectPath = "/admin";
            } else if (userType === "Normal User") {
                redirectPath = "/user";
            }

            // Mise à jour du toast pour indiquer le succès
            toast.update(toastId, {
                render: "Connexion réussie!",
                type: "success",
                isLoading: false,
                autoClose: 3000, // Le toast disparaît après 3 secondes
            });

            // Afficher une deuxième toast avec un spinner et un texte vert
            setTimeout(() => {
                toast.success(
                    <div className="flex items-center">
                        <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-green-500 mr-2"></div>
                        <span className="text-black font-bold">Chargement de la page...</span>
                    </div>,
                    {
                        icon: false, // Supprime l'icône par défaut
                        autoClose: 3000, // Le toast disparaît après 3 secondes
                    }
                );
            }, 3000);

            // Redirection après la deuxième toast
            setTimeout(() => navigate(redirectPath), 5000); // Redirection après succès
        } catch (error) {
            // Mise à jour du toast pour indiquer une erreur
            toast.update(toastId, {
                render: "Identifiants incorrects !",
                type: "error",
                isLoading: false,
                autoClose: 5000,
            });
            setErrors({ email: true, password: true });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[100vh] bg-gradient-to-r from-gray-50 to-gray-50">

            {/* Carte contenant le formulaire */}
            <div className="p-8 rounded-lg shadow-lg w-96 bg-white/80 backdrop-blur-md">

                <div className="flex justify-center mb-4">
                    <FaSignInAlt className="text-blue-600 text-4xl" />
                </div>

                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="block font-medium">Email:</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
                            <FaEnvelope className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                placeholder="Nom utilisateur ou email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full outline-none ${errors.email ? "border-red-500" : "focus:border-blue-400"}`}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block font-medium">Password:</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Mot de passe"
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full outline-none ${errors.password ? "border-red-500" : "focus:border-blue-400"}`}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer ml-2">
                                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-sm mt-4">
                        <div>
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-gray-600">Remember me</label>
                        </div>
                        <Link href="#" className="text-[rgb(110,110,210)]">Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[rgb(110,110,210)] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Pas encore inscrit? </span>
                        <a href="/signup" className="text-[rgb(110,110,210)] hover:underline">S'inscrire</a>
                    </div>
                </form>
            </div>

            {/* Notification Toast (messages d'erreur, succès, etc.) */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}

export default Login;
