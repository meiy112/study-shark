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
      const query = `SELECT DISTINCT g.name AS title, g.code AS joinCode, count(s.studyMaterialTitle) AS numMaterials FROM \`Group\` g
                    LEFT JOIN Shares s ON g.code = s.groupCode 
                    INNER JOIN Joins j ON g.code = j.groupCode
                    WHERE j.username = ? GROUP BY g.code;`
      // return groups
      return new Promise ((resolve, reject) => {
        db.query(query, [username], (err, rows, fields) => {
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