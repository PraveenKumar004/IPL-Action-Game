import React, { useEffect, useState } from 'react';
import TopNav from '../components/topNavBarContestant'
import SideNav from '../components/sideNavBarContestant'
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../styles/manager.css'
import axios from 'axios';

const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling'],
    withCredentials: true,
});

function Home() {
    const [players, setPlayers] = useState({});
    const [team, setteam] = useState();

    const { id } = useParams();
    const { mid } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const verifysession = sessionStorage.getItem("id");

    useEffect(() => {
        if (verifysession !== id) {
            navigate('/');
            return;
        };

        socket.emit('joinPlayerRoom', id);
        socket.on('data', (updatedAuction) => {
            setPlayers(updatedAuction);
        });
        return () => {
            socket.emit('leavePlayerRoom', id);
        };
    }, [id, verifysession]);

    useEffect(() => {
        if (players) {
            socket.emit('joinAuctionRoom', mid);
            socket.on('auctiondetails', (details) => {
                setteam(details);
            });
            socket.on('bidUpdate', (updatedAuction) => {
                setteam(updatedAuction);
            });
            return () => {
                socket.emit('leaveAuctionRoom', mid);
            };
        }
    }, [players, mid]);

    const Bid = () => {
        if (team) {
            console.log("val", team.price);

            if (players.amount > team.price && team.teamName !== players.teamName) {
                let bidValue;
                switch (true) {
                    case team.price === 0:
                        bidValue = team.baseprice;
                        break;
                    case team.price <= 1:
                        bidValue = 0.2;
                        break;
                    case team.price <= 5:
                        bidValue = 0.5;
                        break;
                    case team.price <= 15:
                        bidValue = 1;
                        break;
                    case team.price <= 100:
                        bidValue = 1.5;
                        break;
                    default:
                        alert("Can't Bid");
                        return; // Exit function if price exceeds 100
                }
                socket.emit('AuctionBid', bidValue, mid, id);
            } else {
                alert("Can't Bid");
            }
        }
    };

    useEffect(() => {
        console.log("cal")
        socket.emit('joinMessageRoom', mid);
        socket.on('messagedetails', (details) => {
            setMessages(details);
        });

        return () => {
            socket.emit('leavemessageRoom', mid);
            socket.off('messagedetails');
            socket.off('newMessage');
        };
    }, [mid]);

    const sendMessage = async () => {
        console.log("message")
        if (message !== '' && players) {
            const messageData = {
                mid: mid,
                message,
                sender: players.teamAbbreviation,
            };
            socket.emit('newMessage', messageData);
            setMessage('');
        }
    };

    return (
        <>
            <div className='top-position'><TopNav Title={players.teamName} /></div>
            <div className='d-flex'>
                <div className='side-position'><SideNav /></div>
                <div className='main'>
                    <div className='manager-body'>
                        <div className='manager-body-left'>
                            <div className=' w-75 mt-5 h4 d-flex flex-wrap justify-content-between'>
                                <div>Remaining : {players && <span>{players.amount} C </span>}</div>
                                <div>Points : {players && <span>{players.points} Pts </span>}</div>
                            </div>
                            <div className='play-show mt-3'>
                                {team &&
                                    <div className='inside-show'>
                                        <div className='show-play text-center'>{team.name}</div>
                                        <div style={{ fontSize: '17px' }}>{team.countryshort} - {team.category} - {team.baseprice}C</div>
                                        <div style={{ fontSize: '17px', fontWeight: '600' }}>Points : {team.points}</div>
                                    </div >
                                }
                            </div>
                            {team &&
                                <div className='play-show-2 mt-4'>
                                    <div style={{ fontSize: '17px', fontWeight: '600' }}>Current Bid</div>
                                    <div style={{ fontSize: '24px', fontWeight: '600' }} className='text-center'>{team.teamName}</div>
                                    <div style={{ fontSize: '17px', fontWeight: '600' }} className='text-center'>{team.price} C</div>
                                </div>
                            }
                            <div className='play-show-3 mt-4 justify-content-center'>
                                <div onClick={() => { Bid() }} className='bid-button' style={{ cursor: 'pointer' }}>Make Bid</div>
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
                                        <button className='chat-button p-1' onClick={sendMessage}>Send</button></div>
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
