const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
require('dotenv/config');
const express = require('express');

const models = require('./models');
const routes = require('./routes');

const args = process.argv.slice(2); // Removing the first two elements

console.log('Command-line arguments:', args);

const app = express();
app.use(cors());
app.use(express.json());

// provides authenticated user as well as model context to the rest of the application
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  };
  next();
});


app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use("/test", routes.test);

const ipAddress = '0.0.0.0';
app.listen(process.env.PORT, ipAddress, () => {
  console.log(`App listening on ${process.env.PORT}`);
});