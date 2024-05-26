import React from 'react';
import '../styles/navAndLayout.css';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { useParams, useNavigate } from 'react-router-dom';

const TopNav = ({ Title }) => {

    const { id } = useParams();
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='d-flex topnav align-items-center'>
                <div className='bar ps-3' onClick={handleShow}><FaBars /></div>
                <div className='title pt-1'>IPL </div>
                <div className='tophead pt-1 h5'>{Title}</div>
            </div>
            <Offcanvas show={show} onHide={handleClose} className='offcanva w-75'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>IPL</Offcanvas.Title>
                </Offcanvas.Header>
                <div className='inside-sidenav'>
                    <NavLink className='sidenav-links d-flex' to={`/manager/${id}`}>
                        <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Dashboard</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/playerlist/${id}`}>
                        <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Player List</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/teams/${id}`}>
                        <div><BsFillPeopleFill /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Teams</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/soldplayer/${id}`}>
                        <div><CgProfile /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Sold Player</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/unsoldplayer/${id}`}>
                        <div><MdOutlineTaskAlt /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Unsold Player</div>
                    </NavLink>
                    <Link className='sidenav-links d-flex' >
                        <div><IoSettingsOutline /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Change Password</div>
                    </Link>
                    <Link className='sidenav-links d-flex' >
                        <div><IoSettingsOutline /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Logout </div>
                    </Link>
                    <Link className='sidenav-links d-flex' >
                        <div><IoSettingsOutline /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Delete Game</div>
                    </Link>
                </div>
            </Offcanvas>
        </>
    );
};

export default TopNav;
