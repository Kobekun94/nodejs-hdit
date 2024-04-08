const express = require('express');
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  postDeleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMutipleFiles,
  getAllCustomer,
  putUpdateCustomerAPI,
} = require('../controllers/apiController.js');

const {
  postCreateCustomer,
  postCreateArrayCustomer,
  deleteACustomerAPI,
  deleteArrCustomerAPI,
} = require('../controllers/customerController.js');

const {
  postCreateProject,
  getAllProject,
  postDeleteProject,
  putUpdateProject,
} = require('../controllers/projectController');

const { postCreateTask, getAllTask, postDeleteTask, putUpdateTask } = require('../controllers/taskController');

const routerAPI = express.Router();

//user
routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', postDeleteUserAPI);

routerAPI.post('/file', postUploadSingleFileAPI);
routerAPI.post('/files', postUploadMutipleFiles);

//customer
routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);

routerAPI.get('/customers', getAllCustomer);
routerAPI.put('/customers', putUpdateCustomerAPI);
routerAPI.delete('/customers', deleteACustomerAPI);
routerAPI.delete('/customers-many', deleteArrCustomerAPI);

//query
routerAPI.get('/info', deleteArrCustomerAPI);
routerAPI.get('/info/:name/:address', deleteArrCustomerAPI);

//project
routerAPI.post('/projects', postCreateProject);
routerAPI.get('/projects', getAllProject);
routerAPI.delete('/projects', postDeleteProject);
routerAPI.put('/projects', putUpdateProject);

//task
routerAPI.post('/tasks', postCreateTask);
routerAPI.get('/tasks', getAllTask);
routerAPI.delete('/tasks', postDeleteTask);
routerAPI.put('/tasks', putUpdateTask);

module.exports = routerAPI;
