const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server);

app.post('/api/webhook', (req, res) => {
    const { state, value } = req.body;
    if (state === 'SETTLED') {
        const message = `Thank you. Payment received. ${value} satoshi.`;
        io.emit('paymentReceived', message);
        res.status(200).send('Notification received');
    } else {
        res.status(200).send('Payment not settled');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
