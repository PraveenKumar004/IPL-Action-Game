const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const DB = require("./connection/connection");
const Manager = require("./routes/manager");
const Contestant = require("./routes/contestant");
const Player = require("./routes/players")
const Auction = require("./routes/auction")
const AuctionModal = require("./models/auction");
const ContestantModal = require("./models/contestant")

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server);

DB();

app.use(Manager);

app.use(Contestant);

app.use(Player);

app.use(Auction);

io.on('connection', (socket) => {
    console.log("connected")
    socket.on('requestAuctionDetails', async (id) => {
      try {
        const auctionDetails = await AuctionModal.findOne({ mid:id});
        if (auctionDetails) {
          socket.emit('auctiondetails', auctionDetails);
        } else {
          console.log('Not Found');
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    socket.on('AuctionBid', async (bid, mid, pid) => {
        try {
            const auction = await AuctionModal.findOne({ mid });
            const newPrice = auction.price + bid;
            const Nameget = await ContestantModal.findOne({_id:pid});
            await AuctionModal.findOneAndUpdate({ mid }, { price: newPrice, pid, teamName: Nameget.teamName });
            const updatedAuction = await AuctionModal.findOne({ mid });
            io.emit('bidUpdate', updatedAuction);
    
        } catch (error) {
            console.error('Error updating auction:', error);
        }
    });

    socket.on('AddAuction', async (mid) => {
        try {
            const updatedAuction = await AuctionModal.findOne({ mid });
            io.emit('bidUpdate', updatedAuction);
        } catch (error) {
            console.error('Error updating auction:', error);
        }
    });
    socket.on('Player', async (id) => {
      try {
          const playerData = await ContestantModal.findOne({ _id: id });
          if (playerData) {
              io.emit('data', playerData);
          } else {
              console.log('Player not found for _id:', id);
          }
      } catch (error) {
          console.error('Error fetching player data:', error);
      }
  });
    
  });

server.listen(5000, () => {
    console.log("Server is running");
});