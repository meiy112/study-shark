const { v4: uuidv4 } = require('uuid'); // I think this will be useful but u dont have to use it
const cors = require('cors');
require('dotenv/config');
const express = require('express');

const routes = require('./routes');

const args = process.argv.slice(2); // for debugging, you can ignore this or delete it

console.log('Command-line arguments:', args);

const app = express();
app.use(cors());
app.use(express.json());


app.use("/achievement-level", routes.achievementLevel);
// add more here, for example:
// app.use('/users', routes.user);

const ipAddress = '0.0.0.0';
app.listen(3000, ipAddress, () => {
  console.log(`App listening on ${process.env.PORT}`);
});