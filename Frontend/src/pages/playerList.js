import React, { useEffect, useState } from 'react';
import TopNav from '../components/topNavBarManager';
import SideNav from '../components/sideNavBarManger';
import '../styles/select.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Home() {

    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [category, setCategory] = useState('FULL LIST');
    const [searchQuery, setSearchQuery] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const verifysession = sessionStorage.getItem("id");

    useEffect(() => {
        if (verifysession !== id) {
            navigate('/');
            return;
        }
        getPlayers();
    }, [id,verifysession]);

    useEffect(() => {
        filterPlayers(category, searchQuery);
    }, [players, category, searchQuery]);

    const getPlayers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getplayer');
            setPlayers(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const filterPlayers = (category, query) => {
        let filtered = players;

        if (category !== 'FULL LIST') {
            filtered = filtered.filter(player => player.category === category);
        }

        if (query) {
            filtered = filtered.filter(player => player.name.toLowerCase().includes(query.toLowerCase()));
        }

        setFilteredPlayers(filtered);
    };

    return (
        <>
            <div className='top-position'><TopNav Title={"Player List"} /></div>
            <div className='d-flex'>
                <div className='side-position'><SideNav /></div>
                <div className='main'>
                    <div className='task-search-filter mt-4'>
                        <button className='task-btn m-2' style={{ marginLeft: '0px' }} onClick={() => setCategory('FULL LIST')}>FULL LIST</button>
                        <button className='task-btn m-2' onClick={() => setCategory('BAT')}>BAT</button>
                        <button className='task-btn m-2' onClick={() => setCategory('BOWL')}>BOWL</button>
                        <button className='task-btn m-2' onClick={() => setCategory('ALL')}>ALL</button>
                    </div>
                    <div className='task-search-filter mt-3'>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='search-input'
                        />
                    </div>
                    <div className='task-list mt-4'>
                        <div className='tasks-body'>
                            <div className='task_title pb-3 pt-4' style={{ fontSize: '20px', color: '#0051ad', fontWeight: '500' }}>Players List</div>
                            <div className='task_body'>
                                <div className='task_body_title mt-5 pb-3'>
                                    <div className='title-h1'>Name</div>
                                    <div className='title-h2'>Country</div>
                                    <div className='title-h3'>Category</div>
                                    <div className='title-h4'>Base Price</div>
                                    <div className='title-h5'>Points</div>
                                </div>
                                {filteredPlayers.length ? filteredPlayers.map(player => (
                                    <React.Fragment key={player._id}>
                                        <div className='task-inside-body-2 pb-1'>
                                            <div className='title-c1'>{player.name}</div>
                                            <div className='title-c2'>{player.countryshort}</div>
                                            <div className='title-c3'>{player.category}</div>
                                            <div className='title-c4'>{player.baseprice}</div>
                                            <div className='title-c5'>{player.points}</div>
                                        </div>
                                        <div className='task-inside-body-mobile pb-1'>
                                            <div className='mobile-c1' style={{ fontSize: '13px' }}>{player.name}</div><div className='mobile-c1'>|</div>
                                            <div className='mobile-c1'>{player.countryshort}</div><div className='mobile-c1'>|</div>
                                            <div className='mobile-c1'>{player.category}</div><div className='mobile-c1'>|</div>
                                            <div className='mobile-c1'>{player.baseprice}</div><div className='mobile-c1'>|</div>
                                            <div className='mobile-c1'>{player.points}</div>
                                        </div>
                                    </React.Fragment>
                                )) : <div>No Player</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
