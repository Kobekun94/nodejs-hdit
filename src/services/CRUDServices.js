const connection = require('../config/database');

const getAllUsers = async () => {
  let [results, fields] = await connection.query('SELECT * FROM Users');
  return results;
};

const getUserById = async (userID) => {
  let [results, fields] = await connection.query('select * from Users where id = ?', [userID]);
  let user = results && results.length > 0 ? results[0] : {};
  return user;
};

const deleteUserById = async (userId) => {
  let [results, fields] = await connection.query(`DELETE FROM Users WHERE id = ?`, [userId]);
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
};
