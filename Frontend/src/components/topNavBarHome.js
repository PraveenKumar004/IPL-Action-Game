import React from 'react';
import '../styles/navAndLayout.css';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import {  useNavigate } from 'react-router-dom';


const TopNav = ({ Title }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='d-flex topnav align-items-center'>
                <div className='bar ps-3' onClick={handleShow}><FaBars /></div>
                <div className='title pt-1' onClick={()=>{window.location.href='/'}}>IPL </div>
                <div className='tophead pt-1 h5'>{Title}</div>
            </div>
            <Offcanvas show={show} onHide={handleClose} className='offcanva w-75'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title onClick={()=>{window.location.href='/'}}>IPL</Offcanvas.Title>
                </Offcanvas.Header>
                <div className='inside-sidenav'>
                    <NavLink className='sidenav-links d-flex' to='/'>
                        <div><FaHome /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Home</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to='/playerlist'>
                        <div><IoPeople /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Player List</div>
                    </NavLink>
                </div>
            </Offcanvas>
        </>
    );
};

export default TopNav;
