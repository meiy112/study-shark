// AdminService.js
const db = require('../configs/db');

class AdminService {
//   // performs SQL query to get user info.

//   // gets user's info
//   async getUser(username) {
//     try {
//       // if user is not authenticated return error "No username"
//       if (username == 'no user') {
//         const err = new Error("No username");
//         throw err; 
//       } 
//       // else return user's info
//       return new Promise ((resolve, reject) => {
//         const head = "SELECT username, dateJoined AS joined, points AS exp, u.reputation AS title, r.borderColor AS color, school, email, ";
//         const mat = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.username = u.username AND T.id = csm.topicId) AS totalMat, ";
//         const topic = "(SELECT COUNT(*) FROM createsTopic T WHERE T.username = u.username) AS totalTopics, ";
//         const group = "(SELECT COUNT(*) FROM joins j WHERE j.username = u.username) AS totalGroups, ";
//         const achieve = "(SELECT COUNT(*) FROM obtains o WHERE u.username = o.username) AS totalAchievements ";
//         const tail = "FROM user u, reputation r WHERE u.reputation = r.reputation AND u.username = ?;"; 
//         db.query(head + mat + topic + group + achieve + tail, [username], (err, rows, fields) => {
//           if (err) {
//               reject(err);
//               return;
//           }
//           resolve(rows[0]);
//         });
//       })
//     } catch (error) {
//       throw error; 
//     }
//   }
}

module.exports = new AdminService();