// achievementLevelService.js
const db = require('../configs/db');

class AchievementLevelService {
  // You can start implementing these if you want, but
  // it is required that we write the SQL statements together so dont do all of them by yourself lmao
  // If you dont like callbacks you can search up how to wrap the query function configs/db.js
  // in a promise to use async/await

  // performs SQL query to get achievement levels.
  getAllAchievementLevels(callback) {
    db.query('SELECT * FROM AchievementLevel', (err, rows, fields) => {
      callback(err, rows);
    });
  }

  postAchievementLevel(req, callback) {
    const query = "INSERT INTO `AchievementLevel` (`difficulty`, `points`, `borderColor`) VALUES (?, ?, ?)";
    console.log(req);
    console.log(req.body);
    db.query(query, [req.body.difficulty, req.body.points, req.body.borderColor], (err, rows, fields) => {
      callback(err, rows);
    });
  }

  //more methods here
}

module.exports = new AchievementLevelService();