import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Manager from './pages/manager'
import Contestant from './pages/contestant'
import PlayerList from './pages/playerList'
import PlayerListContest from './pages/playerListContestant'
import Select from './pages/select'
import Teams from './pages/teams'
import TeamContest from './pages/teamsContestant'
import Sold from './pages/soldPlayer'
import UnSold from './pages/unsoldPlayer'
import SoldContestant from './pages/soldPlayerContestant'
import UnSoldContestant from './pages/unsoldPlayerContestant'
import Preview from './pages/teampreview'
import Add from './pages/addplayer'
import Nopage from './pages/Nopage';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/manager/:id' element={<Manager/>}/>
          <Route path='/:mid/contestant/:id' element={<Contestant/>}/>
          <Route path='/teampreview/:id' element={<Preview/>}/>
          <Route path='/select/:id' element={<Select/>}/>
          <Route path='/playerlist/:id' element={<PlayerList/>}/>
          <Route path='/playerlist' element={<PlayerList/>}/>
          <Route path='/:mid/playerlist/:id' element={<PlayerListContest/>}/>
          <Route path='/teams/:id' element={<Teams/>}/>
          <Route path='/:mid/teams/:id' element={<TeamContest/>}/>
          <Route path='/soldplayer/:id' element={<Sold/>}/>
          <Route path='/unsoldplayer/:id' element={<UnSold/>}/>
          <Route path='/:mid/soldplayer/:id' element={<SoldContestant/>}/>
          <Route path='/:mid/unsoldplayer/:id' element={<UnSoldContestant/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='*' element={<Nopage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
