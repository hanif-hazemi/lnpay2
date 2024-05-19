const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server);

// Setup webhook endpoint
app.post('/api/webhook', (req, res) => {
    const { state, value } = req.body;
    if (state === 'SETTLED') {
        const message = `Thank you. Payment received. ${value} satoshi.`;
        io.emit('paymentReceived', message); // Emit the event to clients
        res.status(200).send('Notification received');
    } else {
        res.status(200).send('Payment not settled');
    }
});

// Serve frontend
app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
