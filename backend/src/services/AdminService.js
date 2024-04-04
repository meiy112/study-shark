// AdminService.js
const db = require('../configs/db');
require('dotenv/config');

class AdminService {
  // performs SQL query to get user info.

  // gets user specified Topics
  async getAdminTopics(query, username) {
    // function to user is not admin
    const checkNotAdmin = (username) => {
        return new Promise((resolve, reject) => {
            const exists = 'SELECT username FROM user WHERE user.username = ?'; 
            db.query(exists, [username], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.length == 0);
            });
        });
      };

    try {
      // if user is not admin return error "Not admin"
      if (await checkNotAdmin(username)) {
        const err = new Error("Not admin");
        throw err; 
      }
      let execute = "SELECT id, username AS name, title FROM createsTopic ";
      // if query string is not empty, return all topics with specified WHERE clause
      if (query.length != 0) {
        execute += "WHERE " + query; 
      }
      // return topics
      return new Promise ((resolve, reject) => {
        db.query(execute, (err, rows, fields) => {
          if (err) {
              reject(err);
              return;
          }
          resolve(rows);
        });
      })
    } catch (error) {
      throw error; 
    }
  }

  // returns tuples given attribute list and table
  async postAdminTable(name, attrList, username) {
    // function to check if user is not admin
    const checkNotAdmin = (username) => {
        return new Promise((resolve, reject) => {
            const exists = 'SELECT username FROM user WHERE user.username = ?'; 
            db.query(exists, [username], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.length == 0);
            });
        });
      };
    
    const checkTableDoesNotExist = () => {
      return new Promise((resolve, reject) => {
          const notExists = "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = ? AND table_name = ?);"; 
          db.query(notExists, [process.env.DB, name], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(Object.values(rows[0])[0] == 0);
          })
      })
    };

    const checkAttributeDoesNotExist = (attribute) => {
      return new Promise((resolve, reject) => {
          const notExists = "SELECT COUNT(*) FROM information_schema.columns WHERE table_name = ? AND column_name = ?;"; 
          db.query(notExists, [name, attribute], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(Object.values(rows[0])[0] == 0);
          })
      })
    };

    try {
      // if user is not admin return error "Not admin"
      if (await checkNotAdmin(username)) {
        const err = new Error("Not admin");
        throw err; 
      }
      // if table does not exist in the databse return error "table does not exist"
      if (await checkTableDoesNotExist()) {
        const err = new Error("table does not exist");
        throw err; 
      }
      // if attribute list is empty return error "no attributes provided"
      if (attrList.length == 0) {
        const err = new Error("no attributes provided");
        throw err; 
      }
      // if attribute isn't in the table return error "attribute not in table"
      for (var attr of attrList) {
        if (await checkAttributeDoesNotExist(attr)) {
          const err = new Error("attribute not in table");
          throw err; 
        }
      }

      let execute = "SELECT ";
      for (let i = 0; i < attrList.length; i++) {
        if (i == attrList.length - 1) {
          execute += attrList[i] + " ";
        } else { 
          execute += attrList[i] + ", ";
        }
      }
      execute += "FROM " + name + ";";
      // console.log(execute);
      // return tuples
      return new Promise ((resolve, reject) => {
        db.query(execute, (err, rows, fields) => {
          if (err) {
              reject(err);
              return;
          }
          resolve(rows);
        });
      })
    } catch (error) {
      throw error; 
    }
  }
}

module.exports = new AdminService();