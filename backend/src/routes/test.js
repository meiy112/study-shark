import { Router } from 'express';
import db from '../configs/db'; // Import the database connection

const router = Router();

router.get('/', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('The solution is: ' + rows[0].solution);
  });
});

export default router;