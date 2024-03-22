// achievementLevelService.js
const db = require('../configs/db');

class AchievementLevelService {
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
}

module.exports = new AchievementLevelService();