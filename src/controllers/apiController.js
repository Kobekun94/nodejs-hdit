const User = require('../models/user');
const Customer = require('../models/customer');
const { uploadSingleFile, uploadMutipleFiles } = require('../services/fileService');
const { getAllCustomerService } = require('../services/customerService');
const { PromiseProvider } = require('mongoose');

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;

  let user = await User.updateOne({ _id: userId }, { name: name, email: email, city: city });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const postDeleteUserAPI = async (req, res) => {
  let userId = req.body.userId;
  const user = await User.deleteOne({ _id: userId });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const postUploadSingleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let results = await uploadSingleFile(req.files.image);
  console.log(results);

  return res.send('Upload');
};

const postUploadMutipleFiles = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  if (Array.isArray(req.files.image)) {
    let result = await uploadMutipleFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    return await postUploadSingleFileApi(req, res);
  }
};

const getAllCustomer = async (req, res) => {
  console.log(req.query);
  let limit = req.query.limit;
  let page = req.query.page;
  let results = null;
  if (limit && page) {
    results = await getAllCustomerService(limit, page);
  } else {
    results = await getAllCustomerService();
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  }
};

const putUpdateCustomerAPI = async (req, res) => {
  let name = req.body.name;
  let address = req.body.address;
  let phone = req.body.phone;
  let email = req.body.email;
  let image = req.body.image;
  let description = req.body.description;
  let userId = req.body.userId;

  let customer = await Customer.updateOne(
    { _id: userId },
    { name: name, address: address, phone: phone, email: email, image: image, description: description },
  );

  return res.status(200).json({
    errorCode: 0,
    data: customer,
  });
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  postDeleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMutipleFiles,
  getAllCustomer,
  putUpdateCustomerAPI,
};
