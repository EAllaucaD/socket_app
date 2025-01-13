// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the client HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send "Hello World" message to the client
  socket.emit('message', 'Hello World from the server!');
  
  // Listen for 'message' event from the client
  socket.on('message', (msg) => {
    console.log('Message from client: ' + msg);
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
