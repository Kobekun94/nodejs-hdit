const { name } = require('ejs');
const { getAllUsers, getUserById, deleteUserById } = require('../services/CRUDServices');
const connection = require('../config/database');
const User = require('../models/user');

const getHomepage = async (req, res) => {
  let results = await User.find({});
  return res.render('home.ejs', { listUser: results });
};

const getCreate = (req, res) => {
  return res.render('create.ejs');
};

const getUpdatePage = async (req, res) => {
  const userID = req.params.id;
  // const user = await getUserById(userID);
  let user = await User.findById(userID).exec();

  return res.render('update.ejs', { userEdit: user });
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  await User.create({
    email: email,
    name: name,
    city: city,
  });

  res.redirect('/');
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;

  await User.updateOne({ _id: userId }, { name: name, email: email, city: city });

  res.redirect('/');
};

const postDeleteUser = async (req, res) => {
  const userID = req.params.id;
  let user = await User.findById(userID).exec();
  return res.render('delete.ejs', { userDelete: user });
};

const postRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  const user = await User.deleteOne({ _id: userId });
  res.redirect('/');
};

module.exports = {
  getHomepage,
  getCreate,
  getUpdatePage,
  postCreateUser,
  postUpdateUser,
  postDeleteUser,
  postRemoveUser,
};
