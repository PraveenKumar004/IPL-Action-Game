import React from 'react';
import '../styles/navAndLayout.css';
import { NavLink,Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { useParams, useNavigate } from 'react-router-dom';

const SideNav = () => {

  const { id } = useParams();
  const { mid } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className='sidenav'>
        <div className='inside-sidenav'>
          <NavLink className='sidenav-links d-flex' to={`/${mid}/contestant/${id}`}>
            <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Dashboard</div>
          </NavLink>
          <NavLink className='sidenav-links d-flex' to={`/${mid}/playerlist/${id}`}>
            <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Player List</div>
          </NavLink>
          <NavLink className='sidenav-links d-flex' to={`/${mid}/teams/${id}`}>
            <div><BsFillPeopleFill /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Teams</div>
          </NavLink>
          <NavLink className='sidenav-links d-flex' to={`/${mid}/soldplayer/${id}`}>
            <div><CgProfile /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Sold Player</div>
          </NavLink>
          <NavLink className='sidenav-links d-flex' to={`/${mid}/unsoldplayer/${id}`}>
            <div><MdOutlineTaskAlt /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Unsold Player</div>
          </NavLink>
          <Link className='sidenav-links d-flex' >
            <div><IoSettingsOutline /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Change Password</div>
          </Link>
          <Link className='sidenav-links d-flex' >
            <div><IoSettingsOutline /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Logout </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
