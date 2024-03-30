// AdminService.js
const db = require('../configs/db');

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
      if (query != '') {
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
}

module.exports = new AdminService();