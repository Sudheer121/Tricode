//jshint esversion:6

require('dotenv').config();
let express = require('express');
let app = express();

const {db} = require("./models")

// var cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

const register = require("./routes/register");
const login = require("./routes/login");
app.use("/", register);
app.use("/", login);

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.listen(process.env.PORT || 7000, function () {
  console.log("Server running on post 7000");
  testConnection();
});
