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
      const select1 = "SELECT DISTINCT g.name AS title, g.code AS joinCode, COUNT(*) AS numMaterials ";
      const from1 = "FROM `Group` g, Shares s, Joins j ";
      const where = "WHERE g.code = s.groupCode AND g.code = j.groupCode AND j.username = ? ";
      const group1 = "GROUP BY g.code UNION ";
      const select2 = "SELECT DISTINCT g.name AS title, g.code AS joinCode, 0 ";
      const from2 = "FROM `Group` g, Joins j WHERE g.code = j.groupCode AND g.name NOT IN ";
      const select3 = "(SELECT DISTINCT g.name AS title FROM `Group` g, Shares s, Joins j ";
      const where3 = "WHERE g.code = s.groupCode AND g.code = j.groupCode AND j.username = ? ";
      const group2 = "GROUP BY g.code) AND j.username = ? GROUP BY g.code;";
      // return groups
      return new Promise ((resolve, reject) => {
        db.query(select1 + from1 + where + group1 + select2 + from2 + select3 + where3 + group2, [username, username, username], (err, rows, fields) => {
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