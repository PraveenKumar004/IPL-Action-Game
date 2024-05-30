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

    const [buttonshow, setbuttonshow] = useState(true);
    const [buttonshow1, setbuttonshow1] = useState(false);
    const [buttonshow2, setbuttonshow2] = useState(false);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const setshowbutton3 = () => {
        setbuttonshow(false);
        setbuttonshow1(true);
        const messageData = {
            mid: id,
            message: "Manager said Once",
            sender: "Manager",
        };
        socket.emit('newMessage', messageData);
        setMessage('');
    }
    const setshowbutton2 = () => {
        setbuttonshow1(false);
        setbuttonshow2(true);
        const messageData = {
            mid: id,
            message: "Manager said Twice",
            sender: "Manager",
        };
        socket.emit('newMessage', messageData);
        setMessage('');
    }
    const undo = () => {
        setbuttonshow1(false);
        setbuttonshow2(false);
        setbuttonshow(true);
        const messageData = {
            mid: id,
            message: "Manager Recall",
            sender: "Manager",
        };
        socket.emit('newMessage', messageData);
        setMessage('');
    }

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
                if (players.teamName) {
                    const messageData = {
                        mid: id,
                        message: `${players.name} SOLD to ${players.teamName}`,
                        sender: "Manager",
                    };
                    socket.emit('newMessage', messageData);
                    setMessage('');
                }
                else {
                    const messageData = {
                        mid: id,
                        message: `${players.name} UNSOLD`,
                        sender: "Manager",
                    };
                    socket.emit('newMessage', messageData);
                    setMessage('');
                };
            }
        }
        catch (err) {
            console.error('Error selling player:', err);
        }
    };

    const [managerdet, setManagerdet] = useState()

    const getManagerdetail = async () => {
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

    useEffect(() => {
        console.log("cal")
        socket.emit('joinMessageRoom', id);
        socket.on('messagedetails', (details) => {
            setMessages(details);
        });

        return () => {
            socket.emit('leavemessageRoom', id);
            socket.off('messagedetails');
            socket.off('newMessage');
        };
    }, [id]);

    const sendMessage = async () => {
        console.log("message")
        if (message !== '') {
            const messageData = {
                mid: id,
                message,
                sender: "Manager",
            };
            socket.emit('newMessage', messageData);
            setMessage('');
        }
    };

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
                                <div className='auction-btn d-flex align-items-center justify-content-center h5' style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => { navigate(`/select/${id}`) }}><IoPersonAdd /></div>
                                {buttonshow && <div className='auction-btn d-flex align-items-center justify-content-center' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={setshowbutton3}>1</div>}
                                {buttonshow1 && <div className='auction-btn d-flex align-items-center justify-content-center' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={setshowbutton2}>2</div>}
                                {buttonshow2 && <div className='auction-btn d-flex align-items-center justify-content-center' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={soldplayer}><RiAuctionFill /></div>}
                                <div className='auction-btn d-flex align-items-center justify-content-center h5' style={{ width: '45px', height: '45px', cursor: 'pointer' }} onClick={() => { undo() }}><FaUndoAlt /></div>
                            </div>
                        </div>
                        <div className='manager-body-right mt-4 mb-5'>
                            <div className=' inside-chat' style={{ overflowY: 'scroll' }}>
                                <div>
                                    {messages.map((msg, index) => (
                                        <div className='m-2' key={index}>
                                            <div className='chat-team p-1 ps-2 pe-2'>{msg.sender}</div>
                                            <div className='chat-message p-1 ps-2 pe-2'>{msg.message}</div>
                                        </div>
                                    ))}
                                    <div className='m-2 mb-3'>
                                        <input placeholder='enter message' className='chat-input p-1' value={message} onChange={(e) => setMessage(e.target.value)} />
                                        <button className='chat-button p-1' onClick={sendMessage}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
