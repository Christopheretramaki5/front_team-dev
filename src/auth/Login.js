import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification des champs vides
        let newErrors = { email: !email.trim(), password: !password.trim() };
        setErrors(newErrors);

        if (newErrors.email || newErrors.password) {
            toast.error("Tous les champs sont obligatoires !");
            return;
        }

        try {
            login(email, password);
            toast.success("Connexion réussie !");

            // Attendre 2 secondes avant la redirection
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            toast.error("⚠️ Identifiants incorrects !");
            setErrors({ email: true, password: true }); // Encadrer les champs en rouge
        }
    };

    return (
        // Conteneur principal qui centre le formulaire sur l'écran avec un fond transparent
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-50">

            {/* Carte contenant le formulaire avec un fond blanc semi-transparent et un effet de flou */}
            <div className="p-8 rounded-lg shadow-lg w-96 bg-white/80 backdrop-blur-md">

                {/* Icône de connexion au centre */}
                <div className="flex justify-center mb-4">
                    <FaSignInAlt className="text-blue-600 text-4xl" />
                </div>

                {/* Titre du formulaire */}
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                {/* Formulaire de connexion */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Champ Email */}
                    <div className="relative">
                        <label className="block font-medium">Email:</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
                            {/* Icône email */}
                            <FaEnvelope className="text-gray-400 mr-2" />
                            {/* Champ de saisie */}
                            <input
                                type="email"
                                placeholder="Nom utilisateur ou email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full outline-none ${errors.email ? "border-red-500" : "focus:border-blue-400"}`}
                            />
                        </div>
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="relative">
                        <label className="block font-medium">Password:</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
                            {/* Icône verrou (mot de passe) */}
                            <FaLock className="text-gray-400 mr-2" />
                            {/* Champ de saisie avec affichage/masquage du mot de passe */}
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Mot de passe"
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full outline-none ${errors.password ? "border-red-500" : "focus:border-blue-400"}`}
                            />
                            {/* Icône permettant d'afficher ou masquer le mot de passe */}
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer ml-2">
                                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </div>
                        </div>
                    </div>

                    {/* Section "Remember me" + Lien "Forgot Password?" */}
                    <div className="flex justify-between items-center text-sm mt-4">
                        <div>
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-gray-600">Remember me</label>
                        </div>
                        {/* Lien vers la récupération du mot de passe */}
                        <a href="#" className="text-blue-500">Forgot Password?</a>
                    </div>

                    {/* Bouton de connexion */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>

                    {/* Lien vers la page d'inscription */}
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Pas encore inscrit? </span>
                        <a href="/signup" className="text-blue-500 hover:underline">S'inscrire</a>
                    </div>
                </form>
            </div>

            {/* Notification Toast (messages d'erreur, succès, etc.) */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}

export default Login;
