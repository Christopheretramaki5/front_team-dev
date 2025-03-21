import React, { useEffect, useState } from 'react'
import logo from './logo.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MdOutlineDashboard } from "react-icons/md";
import { FaAngleRight, FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { FcSalesPerformance, FcCustomerSupport } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiSolidLogInCircle } from "react-icons/bi";
import classNames from "classnames";
import { RiLockPasswordLine, RiLogoutBoxRLine } from "react-icons/ri";
import { LuMessageSquareLock } from "react-icons/lu";
import Swal from "sweetalert2";
import { useAuth } from '../../contexts/AuthContext';


const SideBar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState();
    const [isToggleSubmenu2, setIsToggleSubmenu2] = useState();
    const [isToggleSubmenu3, setIsToggleSubmenu3] = useState();
    const [isToggleSubmenu4, setIsToggleSubmenu4] = useState();
    const [isToggleSubmenu5, setIsToggleSubmenu5] = useState();
    const { userType, logout } = useAuth();

    const openSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    };

    const openSubmenu2 = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu2(!isToggleSubmenu2);
    };
    const openSubmenu3 = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu3(!isToggleSubmenu3);
    };
    const openSubmenu4 = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu4(!isToggleSubmenu4);
    };
    const openSubmenu5 = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu5(!isToggleSubmenu5);
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Vous allez être déconnecté !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, déconnecter",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                logout(); // 🔥 Appelle directement la fonction logout
            }
        });
    };
    useEffect(() => {
        console.log("🔄 Mise à jour de NavBar - UserType:", userType);
    }, [userType]);
    return (
        <div className='sidebar fixed left-0 top-0 z-[100] w-[15%]'>
            <Link>
                <div className="logoWrapper py-3 px-3">
                    <img src={logo} alt="" className='w-100' />
                </div>
            </Link>
            <div className='sidebarTab px-2 mt-2'>
                <ul className='flex gap-2 flex-col group'>
                    <li>
                        <Button className={`w-full ${activeTab === 0 ? 'active' : ''}`} onClick={() => openSubmenu(0)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <MdOutlineDashboard />
                            </span>
                            Dashboard
                        </Button>
                    </li>
                    <li className={`${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                        <Button className={`w-full ${activeTab === 1 ? 'active' : ''}`} onClick={() => openSubmenu(1)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <FaProductHunt />
                            </span>
                            Produits
                            <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 1 && isToggleSubmenu === true ? 'rotate' : ''}`}>
                                <FaAngleRight />
                            </span>
                        </Button>

                        {/* Sous-menu avec affichage conditionnel */}
                        <div className={classNames("submenu", { hidden: !(activeTab === 1 && isToggleSubmenu) })}>
                            <Button className='w-full'>Produit list</Button>
                            <Button className='w-full'>Produit details</Button>
                            <Button className='w-full'>Produit upload</Button>
                        </div>
                    </li>
                    <li className={`${activeTab === 2 && isToggleSubmenu2 === true ? 'colapse' : 'colapsed'}`}>
                        <Button className={`w-full ${activeTab === 2 ? 'active' : ''}`} onClick={() => openSubmenu2(2)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <FaCartArrowDown />
                            </span>
                            Clients
                            <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 2 && isToggleSubmenu2 === true ? 'rotate' : ''}`}>
                                <FaAngleRight />
                            </span>
                        </Button>
                        <div className={classNames("submenu", { hidden: !(activeTab === 2 && isToggleSubmenu2) })}>
                            <Button className='w-full'>Liste des clients</Button>
                            <Button className='w-full'>Détails du client</Button>
                        </div>
                    </li>
                    <li className={`${activeTab === 3 && isToggleSubmenu3 === true ? 'colapse' : 'colapsed'}`}>
                        <Button className={`w-full ${activeTab === 3 ? 'active' : ''}`} onClick={() => openSubmenu3(3)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <FcCustomerSupport />
                            </span>
                            Fournisseurs
                            <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 3 && isToggleSubmenu3 === true ? 'rotate' : ''}`}>
                                <FaAngleRight />
                            </span>
                        </Button>
                        <div className={classNames("submenu", { hidden: !(activeTab === 3 && isToggleSubmenu3) })}>
                            <Button className='w-full'>Fournisseur list</Button>
                            <Button className='w-full'>Fournisseur details</Button>
                        </div>
                    </li>
                    <li className={`${activeTab === 4 && isToggleSubmenu4 === true ? 'colapse' : 'colapsed'}`}>
                        <Button className={`w-full ${activeTab === 4 ? 'active' : ''}`} onClick={() => openSubmenu4(4)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <FcSalesPerformance />
                            </span>
                            Ventes
                            <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 4 && isToggleSubmenu4 === true ? 'rotate' : ''}`}>
                                <FaAngleRight />
                            </span>
                        </Button>
                        <div className={classNames("submenu", { hidden: !(activeTab === 4 && isToggleSubmenu4) })}>
                            <Button className='w-full'>Vente list</Button>
                            <Button className='w-full'>Vente details</Button>
                        </div>
                    </li>

                    <li className={`${activeTab === 5 && isToggleSubmenu5 === true ? 'colapse' : 'colapsed'}`}>
                        <Button className={`w-full ${activeTab === 5 ? 'active' : ''}`} onClick={() => openSubmenu5(5)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <FaCartArrowDown />
                            </span>
                            Achats
                            <span className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${activeTab === 5 && isToggleSubmenu5 === true? 'rotate' : ''}`}>
                                <FaAngleRight />
                            </span>
                        </Button>
                        <div className={classNames("submenu", { hidden: !(activeTab === 5 && isToggleSubmenu5) })}>
                            <Button className='w-full'>Liste achats</Button>
                            <Button className='w-full'>Statistiques</Button>
                        </div>
                    </li>

                    <li>
                        <Button className={`w-full ${activeTab === 6 ? 'active' : ''}`} onClick={() => openSubmenu(6)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <IoSettings />
                            </span>
                            Settings
                        </Button>
                    </li>

                    <li>
                        <h2 className='text-black/70 capitalize px-3 mt-4'>AUTHENTIFICATION</h2>
                    </li>

                    <li>
                        <Button className={`w-full ${activeTab === 7 ? 'active' : ''}`} onClick={() => openSubmenu(7)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <BiSolidLogInCircle />
                            </span>
                            Login
                        </Button>
                    </li>

                    <li>
                        <Button className={`w-full ${activeTab === 8 ? 'active' : ''}`} onClick={() => openSubmenu(8)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <FaUser />
                            </span>
                            Inscription
                        </Button>
                    </li>

                    <li>
                        <Button className={`w-full ${activeTab === 9 ? 'active' : ''}`} onClick={() => openSubmenu(9)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <RiLockPasswordLine />
                            </span>
                            Forget password
                        </Button>
                    </li>

                    <li>
                        <Button className={`w-full ${activeTab === 10 ? 'active' : ''}`} onClick={() => openSubmenu(10)}>
                            <span className='icon mr-3 w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                                <LuMessageSquareLock />
                            </span>
                            OTP Pages
                        </Button>
                    </li>

                    {/* <li className='deconnexion border-red-600'>
                        <Button
                            className={`w-full flex items-center justify-start px-4 py-2 rounded-lg 
                            text-white font-medium transition-all duration-300 
                            ${activeTab === 10 ? "deconnexion bg-red-600 shadow-lg" : "bg-red-500"} 
                            hover:bg-red-700 hover:shadow-xl active:scale-95`}
                            onClick={handleLogout}
                        >
                            <span className="mr-3 w-[30px] h-[30px] flex items-center justify-center rounded-md bg-red-600">
                                <RiLogoutBoxRLine className="text-white text-xl" />
                            </span>
                            Déconnexion
                        </Button>
                    </li> */}
                </ul>

            </div>

        </div >

    )
}

export default SideBar