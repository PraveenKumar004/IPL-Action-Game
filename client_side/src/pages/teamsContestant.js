import React, { useEffect, useState } from 'react';
import TopNav from '../components/topNavBarManager';
import SideNav from '../components/sideNavBarContestant';
import '../styles/teams.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Home() {
    const { id } = useParams();
    const { mid } = useParams();
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState({});

    const verifysession = sessionStorage.getItem("id");

    useEffect(() => {
        if (verifysession !== id) {
            navigate('/');
            return;
        }
        getTeams();
    }, [verifysession, id]);

    useEffect(() => {
        if (teams.length > 0) {
            getPlayers();
        }
    }, [teams]);

    const getTeams = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getteams/${mid}`);
            setTeams(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getPlayers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getsoldplayersbypid/${mid}`);
            const playersByTeam = response.data.reduce((acc, player) => {
                const teamId = player.pid;
                if (!acc[teamId]) {
                    acc[teamId] = [];
                }
                acc[teamId].push(player);
                return acc;
            }, {});
            setPlayers(playersByTeam);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='top-position'><TopNav Title={"Teams"} /></div>
            <div className='d-flex'>
                <div className='side-position'><SideNav /></div>
                <div className='main'>
                    <div className='second-dash-2 mt-3 mb-3'>
                        {teams.map(team => (
                            <div className='tasks' key={team._id} style={{ overflow: 'scroll', overflowX: 'hidden' }}>
                                <div className='task-head mt-3 pb-2'>
                                    <div style={{ fontSize: '19px' }}>{team.teamName}</div>
                                </div>
                                <div className='task-head d-flex flex-wrap mt-3 pb-2'>
                                    <div style={{ fontSize: '17px' }}>Remaining : {team.amount} C</div>
                                    <div style={{ fontSize: '17px' }}>Points : {team.points} Pts</div>
                                </div>
                                {players[team._id] ? (
                                    players[team._id].map(player => (
                                        <div className='d-flex justify-content-evenly pt-2 pb-2' style={{ width: '90%', borderBottom: '1px solid #1b1f233f' }}>
                                            <div>{player.name}-{player.category}</div>
                                            <div>{player.countryshort}</div>
                                            <div>{player.price} C</div>
                                            <div>{player.points} Pts</div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No players</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
