const { name } = require('ejs');
const { getAllUsers, getUserById, deleteUserById } = require('../services/CRUDServices');
const connection = require('../config/database');

const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render('home.ejs', { listUser: results });
};

const getCreate = (req, res) => {
  return res.render('create.ejs');
};

const getUpdatePage = async (req, res) => {
  const userID = req.params.id;
  const user = await getUserById(userID);

  return res.render('update.ejs', { userEdit: user });
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  let [results, fields] = await connection.query(`INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [
    email,
    name,
    city,
  ]);

  // const [results, fields] = await connection.query('SELECT * FROM customer.Users');
  console.log('Check result ', results);
  res.send('create user succeed');
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;

  let [results, fields] = await connection.query(
    `UPDATE Users set  
  email = ?, 
  name = ?, 
  city = ?
  where id = ?`,
    [email, name, city, userId],
  );

  res.redirect('/');
};

const postDeleteUser = async (req, res) => {
  const userID = req.params.id;
  const user = await getUserById(userID);
  return res.render('delete.ejs', { userDelete: user });
};

const postRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  const user = await deleteUserById(userId);
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
