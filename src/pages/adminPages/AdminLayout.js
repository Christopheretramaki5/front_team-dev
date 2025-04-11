import React from 'react';
import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const AdminLayout = () => {
    return (

            <div className='main flex h-screen'>
                <div className="sidebarWrapper w-[15%] bg-gray-100 shadow-md">
                    <SideBar />
                </div>
                {/* Contenu principal */}
                <div className="content-right flex-1 flex flex-col">
                    {/* TopBar */}
                    <div className="w-full bg-white shadow-md">
                        <TopBar />
                    </div>
                    {/* Contenu principal avec un décalage pour la Navbar */}
                    <div className="flex-1 p-4 bg-gray-50 overflow-auto">
                        <Outlet /> {/* Rendre les routes imbriquées ici */}
                    </div>
                </div>
            </div>

    );
};

export default AdminLayout;