require('dotenv').config();
const { mongoose } = require('mongoose');

const connection = async () => {
  try {
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbname: process.env.DB_NAME,
    };
    await mongoose.connect(process.env.DB_HOST, options);
  } catch (error) {
    console.log(error);
  }
};

//https://cloud.mongodb.com/v2/660b80ba3d7bbd01b3a60a18#/clusters/connect?clusterId=Cluster0
//mongodb+srv://buituananh831244:anhvipma1@cluster0.gnxhfl2.mongodb.net/

module.exports = connection;
