import React from 'react';
import '../styles/navAndLayout.css';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const TopNav = ({Title}) => {
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
                    <NavLink className='sidenav-links d-flex' to='/'>
                        <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Home</div>
                    </NavLink>
                </div>
            </Offcanvas>
        </>
    );
};

export default TopNav;
