import React, { useEffect, useState } from 'react';
import TopNav from '../components/topNavBarManager';
import SideNav from '../components/sideNavBarManger';
import { FaUndoAlt } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { RiAuctionFill } from "react-icons/ri";
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/manager.css';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

function Home() {
    const [players, setPlayers] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const verifysession = sessionStorage.getItem("id");

    useEffect(() => {
        if (verifysession !== id) {
            navigate('/');
            return;
        }

        getManagerdetail();
        
        socket.emit('joinAuctionRoom', id);
        
        socket.on('auctiondetails', (details) => {
            setPlayers(details);
        });
        
        socket.on('bidUpdate', (updatedAuction) => {
            setPlayers(updatedAuction);
        });
        
        socket.on('AddAuction', (updatedAuction) => {
            setPlayers(updatedAuction);
        });

        return () => {
            socket.emit('leaveAuctionRoom', id);
            socket.off('auctiondetails');
            socket.off('bidUpdate');
            socket.off('AddAuction');
        };
    }, [id, navigate, verifysession]);

    const soldplayer = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/soldplayer/${id}`);
            if (response.data === "done") {
                alert("Player not sold");
            } else {
                socket.emit('AddAuction', id);
                socket.emit('joinPlayerRoom', response.data);
            }
        } catch (err) {
            console.error('Error selling player:', err);
        }
    };

    const [managerdet , setManagerdet] = useState()

    const getManagerdetail = async () =>{
        try {
            const response = await axios.post(`http://localhost:5000/managerdetails/${id}`);
            if (response.data === "managernot") {
                
            } else {
                setManagerdet(response.data);
            }
        } catch (err) {
            console.error('Error selling player:', err);
        }
    }

    return (
        <>
            <div className='top-position'><TopNav Title={managerdet ? managerdet.id : "Manager"} /></div>
            <div className='d-flex'>
                <div className='side-position'><SideNav /></div>
                <div className='main'>
                    <div className='manager-body'>
                        <div className='manager-body-left'>
                            <div className='play-show mt-4'>
                                {players &&
                                    <div className='inside-show'>
                                        <div className='show-play text-center'>{players.name}</div>
                                        <div style={{ fontSize: '17px' }}>{players.countryshort} - {players.category} - {players.baseprice}C</div>
                                        <div style={{ fontSize: '17px', fontWeight: '600' }}>Points : {players.points}</div>
                                    </div>}
                            </div>

                            <div className='play-show-2 mt-4'>
                                <div style={{ fontSize: '17px', fontWeight: '600' }}>Current Bid</div>
                                {players &&
                                    <>
                                        <div style={{ fontSize: '24px', fontWeight: '600' }} className='text-center'>{players.teamName}</div>
                                        <div style={{ fontSize: '17px', fontWeight: '600' }} className='text-center'>{players.price} C </div>
                                    </>}
                            </div>
                            <div className='play-show-3 mt-4'>
                                <div className='auction-btn d-flex align-items-center justify-content-center h5' style={{ width: '50px', height: '50px', cursor:'pointer' }} onClick={() => { navigate(`/select/${id}`) }}><IoPersonAdd /></div>
                                <div className='auction-btn d-flex align-items-center justify-content-center' style={{ fontSize: '30px',cursor:'pointer' }} onClick={soldplayer}><RiAuctionFill /></div>
                                <div className='auction-btn d-flex align-items-center justify-content-center h5' style={{ width: '45px', height: '45px',cursor:'pointer' }} onClick={()=>{console.log(verifysession)}}><FaUndoAlt /></div>
                            </div>
                        </div>
                        <div className='manager-body-right'>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
