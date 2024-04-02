const express = require('express');
const { getUsersAPI } = require('../controllers/apiController.js');

const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
  res.send('Hello Api');
});

routerAPI.get('/abc', (req, res) => {
  res.status(200).json({
    data: 'hello abc',
  });
});

routerAPI.get('/users', getUsersAPI);

module.exports = routerAPI;
