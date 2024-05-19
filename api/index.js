const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const say = require('say');

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const { amount } = req.body; // Assume the webhook sends an amount in satoshis
    const message = `Thank you. Payment received. ${amount} satoshi.`;
    say.speak(message);
    res.status(200).send('Notification received');
});

module.exports = app;
