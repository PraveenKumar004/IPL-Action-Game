import React from 'react';
import '../styles/navAndLayout.css';
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const SideNav = () => {

  return (
    <>
      <div className='sidenav'>
        <div className='inside-sidenav'>
          <NavLink className='sidenav-links d-flex' to='/'>
            <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Home</div>
          </NavLink>
          <NavLink className='sidenav-links d-flex' to='/playerlist'>
            <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Player List</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideNav;
