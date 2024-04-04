require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routers/web');
const apiRoutes = require('./routers/api');
const fileUpload = require('express-fileupload');

const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

//test connection
(async () => {
  try {
    connection();
    app.listen(port, hostname, () => {
      console.log(`nodejs app listening on port ${port}`);
    });
  } catch (error) {
    console.log('Error connect to db', error);
  }
})();
