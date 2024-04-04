// GroupService.js
const db = require('../configs/db');

class GroupService {
  // performs SQL query to get group info.

  // returns all groups user has joined
  async getUserGroups(username) {
    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err; 
      } 
      const head = "SELECT DISTINCT g.name AS title, g.code AS joinCode, COUNT(*) AS numMaterials FROM `Group` g, Shares s, Joins j ";
      const tail = "WHERE g.code = s.groupCode AND g.code = j.groupCode AND j.username = ? GROUP BY g.code;";
      // return groups
      return new Promise ((resolve, reject) => {
        db.query(head + tail, [username], (err, rows, fields) => {
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

module.exports = new GroupService();