import React from 'react';
import '../styles/navAndLayout.css';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { TbBrandTeams } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdNotInterested } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const TopNav = ({ Title }) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [showh, setShowh] = useState(false);
    const handleCloseh = () => setShowh(false);
    const handleShowh = () => setShowh(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => { setShow(false); setShow2(true); }

    const [data, setdata] = useState({});

    const input = (e) => {
        const { name, value } = e.target;
        setdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const deletemanager = async () => {
        const del = await axios.post(`http://localhost:5000/deletmanager/${id}`)
        if (del.data === "done") {
            navigate('/')
        }
        else {
            alert("Can't Delete")
        }
    }

    const updatepass = async () => {
        const del = await axios.post(`http://localhost:5000/changepasswordmanager/${id}`, data)
        if (del.data === "passupdate") {
            window.location.reload();
        }
        else {
            alert("Can't Update Password")
        }
    }

    const deletemessage = async () => {
        const del = await axios.post(`http://localhost:5000/deletmessage/${id}`)
        if (del.data === "done") {
          alert("Done")
        }
        else {
          alert("Can't Delete")
        }
      }

    return (
        <>
            <div className='d-flex topnav align-items-center'>
                <div className='bar ps-3' onClick={handleShowh}><FaBars /></div>
                <div className='title pt-1' onClick={() => { window.location.href = '/' }}>IPL </div>
                <div className='tophead pt-1 h5'>{Title}</div>
            </div>
            <Offcanvas show={showh} onHide={handleCloseh} className='offcanva w-75'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title onClick={() => { window.location.href = '/' }} >IPL</Offcanvas.Title>
                </Offcanvas.Header>
                <div className='inside-sidenav'>
                    <NavLink className='sidenav-links d-flex' to={`/manager/${id}`}>
                        <div><MdDashboard /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Dashboard</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/playerlist/${id}`}>
                        <div><IoPeople /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Player List</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/teams/${id}`}>
                        <div><TbBrandTeams /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Teams</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/soldplayer/${id}`}>
                        <div><CgProfile /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Sold Player</div>
                    </NavLink>
                    <NavLink className='sidenav-links d-flex' to={`/unsoldplayer/${id}`}>
                        <div><MdNotInterested /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Unsold Player</div>
                    </NavLink>
                    <Link className='sidenav-links d-flex' onClick={handleShow2}>
                        <div><IoSettingsOutline /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }} >Change Password</div>
                    </Link>
                    <Link className='sidenav-links d-flex' onClick={() => { sessionStorage.clear() }}>
                        <div><IoMdLogOut /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Logout </div>
                    </Link>
                    <Link className='sidenav-links d-flex' onClick={handleShow}>
                        <div><RiDeleteBinLine /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Delete Game</div>
                    </Link>
                    <Link className='sidenav-links d-flex' onClick={deletemessage}>
                        <div><RiDeleteBinLine /></div><div style={{ paddingTop: '5px', paddingLeft: '14px', fontSize: '17px' }}>Delete Message</div>
                    </Link>
                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Alert!!</Modal.Title>
                        </Modal.Header>
                        <div className='d-flex flex-column home-modal mt-3 mb-3'>
                            <h4>Confirm Delete ? </h4>
                            <button onClick={deletemanager} className='home-btn' style={{ backgroundColor: 'red', width: '120px' }}>Delete</button>
                        </div>
                    </Modal>
                    <Modal show={show2} onHide={handleClose2} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Password</Modal.Title>
                        </Modal.Header>
                        <div className='d-flex flex-column home-modal mt-3 mb-3'>
                            <input className='home-modal-input' placeholder='Enter Old Password' name='password' onChange={input} />
                            <input className='home-modal-input' placeholder='Enter New Password' name='newpassword' onChange={input} />
                            <button onClick={updatepass} className='home-btn' style={{ width: '150px', fontSize: '16px' }}>Change</button>
                        </div>
                    </Modal>
                </div>
            </Offcanvas>
        </>
    );
};

export default TopNav;
