require('dotenv/config');

const db = require('../configs/db.js');
const fs = require('fs').promises;

// creates tables, insert 
async function initDB() {
  console.log("init db");
  createTables();
}

// creates tables from sql-queries/init.sql
async function createTables() {
  const sqlFilePath = "./src/sql-queries/init.sql"
  const sqlStatement = await fs.readFile(sqlFilePath, 'utf-8');

  db.query(sqlStatement, (initDbError) => {
        if (initDbError) {
          console.error('Error initializing db:', initDbError);
        } else {
          console.log(`Database "${process.env.DB}" initialized successfully`);
        }
      });
      console.log('Executed SQL statement:', sqlStatement);
  };

  module.exports.initDB = initDB;
