import React from "react";
import SideBar from "./adminPages/SideBar"
import { Route, Routes } from "react-router-dom";
import Dashboard from "./adminPages/Dashboard";
import TopBar from "./adminPages/TopBar";

const AdminPanel = () => {
  return (
    // créer page dashboard
    <>

      <section className='main flex'>
        <div className='sidebarWrapper w-[15%]'>
          <SideBar />
        </div>
        <div className='content-right w-[85%]'>
          <TopBar />
          <Routes>
            <Route path='/' exact={true} element={<Dashboard />} />
          </Routes>
        </div>
      </section>
    </>
  );
};

export default AdminPanel;
