const express = require('express');
const app = express();
const cors = require('cors');
const receiveMessage = require('./src/routes/receiveMessage');

app.use(express.json({ limit: '50mb' }));
app.use(cors());

// routes
app.use('/api/receiveMessage', receiveMessage);
