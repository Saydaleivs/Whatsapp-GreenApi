const express = require('express');
const router = express.Router();
const { receiveMessage } = require('../services/recieveMessage');

router.get('/', async (req, res) => {
  const { idInstance, apiTokenInstance, number } = req.query;
  res.send(receiveMessage(idInstance, apiTokenInstance, number));
});

module.exports = router;
