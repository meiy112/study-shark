// UserService.js
const db = require('../configs/db');

class UserService {
  // performs SQL query to get user info.

  // gets user's info
  async getUser(username) {
    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err; 
      } 
      // else return user's info
      return new Promise ((resolve, reject) => {
        const head = "SELECT username, dateJoined AS joined, points AS exp, u.reputation AS title, r.borderColor AS color, school, email, ";
        const mat = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.username = u.username AND T.id = csm.topicId) AS totalMat, ";
        const topic = "(SELECT COUNT(*) FROM createsTopic T WHERE T.username = u.username) AS totalTopics, ";
        const group = "(SELECT COUNT(*) FROM joins j WHERE j.username = u.username) AS totalGroups, ";
        const achieve = "(SELECT COUNT(*) FROM obtains o WHERE u.username = o.username) AS totalAchievements ";
        const tail = "FROM user u, reputation r WHERE u.reputation = r.reputation AND u.username = ?;"; 
        db.query(head + mat + topic + group + achieve + tail, [username], (err, rows, fields) => {
          if (err) {
              reject(err);
              return;
          }
          resolve(rows[0]);
        });
      })
    } catch (error) {
      throw error; 
    }
  }

  // update user's email
  async putUserEmail(username, email) {
    // function to check if email already exists
    const checkEmailExists = (email) => {
        return new Promise((resolve, reject) => {
            const exists = 'SELECT email FROM user WHERE user.email = ?'; 
            db.query(exists, [email], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.length != 0);
            });
        });
      };

    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err; 
      } 
      // if email already exists return error "This email already exists"
      if (await checkEmailExists(email)) {
        const err = new Error("This email already exists");
        throw err;
      }
      // else return user's info
      return new Promise ((resolve, reject) => {
        const update = "UPDATE user SET email = ? WHERE user.username = ?; ";
        const head = "SELECT username, dateJoined AS joined, points AS exp, u.reputation AS title, r.borderColor AS color, school, email, ";
        const mat = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.username = u.username AND T.id = csm.topicId) AS totalMat, ";
        const topic = "(SELECT COUNT(*) FROM createsTopic T WHERE T.username = u.username) AS totalTopics, ";
        const group = "(SELECT COUNT(*) FROM joins j WHERE j.username = u.username) AS totalGroups, ";
        const achieve = "(SELECT COUNT(*) FROM obtains o WHERE u.username = o.username) AS totalAchievements ";
        const tail = "FROM user u, reputation r WHERE u.reputation = r.reputation AND u.username = ?;"; 
        db.query(update + head + mat + topic + group + achieve + tail, [email, username, username], (err, rows, fields) => {
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

  // updates user's school
  async putUserSchool(username, school) {
    // function to check if school does not exist
    const checkSchoolDoesNotExist = (email) => {
        return new Promise((resolve, reject) => {
            const exists = 'SELECT name FROM school WHERE school.name = ?'; 
            db.query(exists, [school], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.length == 0);
            });
        });
      };

    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err; 
      } 
      // if school does not exist return error "This school does not exist"
      if (await checkSchoolDoesNotExist(school)) {
        const err = new Error("This school does not exist");
        throw err;
      }
      // else return user's info
      return new Promise ((resolve, reject) => {
        const update = "UPDATE user SET school = ? WHERE user.username = ?; ";
        const head = "SELECT username, dateJoined AS joined, points AS exp, u.reputation AS title, r.borderColor AS color, school, email, ";
        const mat = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.username = u.username AND T.id = csm.topicId) AS totalMat, ";
        const topic = "(SELECT COUNT(*) FROM createsTopic T WHERE T.username = u.username) AS totalTopics, ";
        const group = "(SELECT COUNT(*) FROM joins j WHERE j.username = u.username) AS totalGroups, ";
        const achieve = "(SELECT COUNT(*) FROM obtains o WHERE u.username = o.username) AS totalAchievements ";
        const tail = "FROM user u, reputation r WHERE u.reputation = r.reputation AND u.username = ?;"; 
        db.query(update + head + mat + topic + group + achieve + tail, [school, username, username], (err, rows, fields) => {
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

module.exports = new UserService();