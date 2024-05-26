import React from 'react'
import { useState } from 'react';
import TopNav from '../components/topNavBarHome'
import SideNav from '../components/sideNavBarHome'
import '../styles/home.css'
import Modal from 'react-bootstrap/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'


function Home() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setdata] = useState({});

    const navigate = useNavigate();

    const input = (e) => {
        const { name, value } = e.target;
        setdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addplayer = async () => {
        try {
            console.log(data);
            const create = await axios.post('http://localhost:5000/createplayer', data);
            if (create.data === "exist") {
                alert("Not Done")
            }
            else {
                alert("Done")
            };
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <div className='top-position'><TopNav Title={"Home"} /></div>
            <div className='d-flex'>
                <div className='side-position'><SideNav /></div>
                <div className='main'>
                    <div className='second-dash'>
                        <button onClick={handleShow} className='home-btn'>Add Player</button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Player</Modal.Title>
                    </Modal.Header>
                    <div className='d-flex flex-column home-modal mt-3 mb-3'>
                        <input className='home-modal-input' placeholder='Enter Name' name='name' onChange={input} />
                        <input className='home-modal-input' placeholder='Enter Country' name='country' onChange={input} />
                        <select className='home-modal-input' placeholder='Enter Country Short' name='countryshort' onChange={input} >
                            <option>Select ShortForm</option>
                            <option>IND</option>
                        </select>
                        <select className='home-modal-input' placeholder='Enter Category' name='category' onChange={input} >
                            <option>Select Category</option>
                            <option>BAT</option>
                            <option>BOWL</option>
                            <option>ALL</option>
                        </select>
                        <input className='home-modal-input' placeholder='Enter Nation' name='nation' onChange={input} />
                        <input className='home-modal-input' placeholder='Enter Base Price' name='baseprice' onChange={input} />
                        <input className='home-modal-input' placeholder='Enter Points' name='points' onChange={input} />
                        <button onClick={addplayer} className='home-btn' style={{ width: '150px', fontSize: '16px' }}>Add</button>
                    </div>
                </Modal>

            </div>
        </>

    )
}

export default Home