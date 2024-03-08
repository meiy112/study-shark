import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import 'dotenv/config';
import express from 'express'

import models from './models'
import routes from './routes';

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