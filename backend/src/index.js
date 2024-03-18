const { v4: uuidv4 } = require('uuid'); // I think this will be useful but u dont have to use it
const cors = require('cors');
require('dotenv/config');
const express = require('express');
//const cookieParser = require("cookie-parser");

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

//app.use(cookieParser());

app.use("/achievement-level", routes.achievementLevel);
app.use("/", routes.authRoute);
// add more here, for example:
// app.use('/users', routes.user);

const ipAddress = '0.0.0.0';
app.listen(3000, ipAddress, () => {
  console.log(`App listening on 3000`);
});