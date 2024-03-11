require('dotenv/config');

const db = require('../configs/db.js');
const fs = require('fs').promises;

// creates tables, insert 
async function initDB() {
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
          console.log("Isnt this script cool? yeah im so cool ur welcome");
          console.log("I inserted 3 Achievement levels, you will need to insert everything else")
        }
      });
      console.log('Executed SQL statement:', sqlStatement);
  };

  module.exports.initDB = initDB;
