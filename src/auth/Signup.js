import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};

        if (!username) newErrors.username = "Nom d'utilisateur requis";
        if (!email) {
            newErrors.email = "Email requis";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) newErrors.email = "Email invalide";
        }
        if (!password) newErrors.password = "Mot de passe requis";
        if (!confirmPassword) newErrors.confirmPassword = "Confirmer le mot de passe";
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Object.values(newErrors).forEach((msg) => toast.error(msg));
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            toast.success("Inscription réussie ! Redirection...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error("Erreur lors de l'inscription : " + error.message);
        }
    };

    //   logique pour afficher/masquer le mot de passe
    const handleShowPasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center">
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


                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-6">SIGN UP</button>
                    
                    
                    {/* Lien vers la page d'inscription */}
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Déjà un compte? </span>
                        <a href="/login" className="text-blue-500 hover:underline">Se connecter</a>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignupPage;
