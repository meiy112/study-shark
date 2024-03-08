import 'dotenv/config';

import { createConnection } from 'mysql2';

const db = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PW,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


export default db;