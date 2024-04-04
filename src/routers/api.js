const express = require('express');
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  postDeleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMutipleFiles,
} = require('../controllers/apiController.js');

const { postCreateCustomer } = require('../controllers/customerController.js');

const routerAPI = express.Router();

routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', postDeleteUserAPI);

routerAPI.post('/file', postUploadSingleFileAPI);
routerAPI.post('/files', postUploadMutipleFiles);

routerAPI.post('/customers', postCreateCustomer);

module.exports = routerAPI;
