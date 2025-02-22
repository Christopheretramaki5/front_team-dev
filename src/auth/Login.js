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
            toast.error("❌ Tous les champs sont obligatoires !");
            return;
        }

        try {
            login(email, password);
            toast.success("✅ Connexion réussie !");

            // Attendre 2 secondes avant la redirection
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            toast.error("⚠️ Identifiants incorrects !");
            setErrors({ email: true, password: true }); // Encadrer les champs en rouge
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
                                type={showPassword ? "text" : "password"} // Change l'input entre texte et mot de passe
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full outline-none ${errors.password ? "border-red-500" : "focus:border-blue-400"}`}
                            />
                            {/* Icône pour afficher/masquer le mot de passe */}
                            <div 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="cursor-pointer ml-2">
                                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </div>
                        </div>
                    </div>
                    {/* Ajout du checkbox "Remember me" et du lien "Forgot Password?" */}
                    <div className="flex justify-between items-center text-sm mt-4">
                        <div>
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-gray-600">Remember me</label>
                        </div>
                        <a href="#" className="text-blue-500">Forgot Password?</a>
                    </div>
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default Login;
