// achievementLevelController.js
const achievementLevelService = require('../services/AchievementLevelService');

class AchievementLevelController {
  // gets all AchievementLevels
  getAllAchievementLevels(req, res) {
    achievementLevelService.getAllAchievementLevels((err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(rows);
    });
  }

  postAchievementLevel(req, res) {
    achievementLevelService.postAchievementLevel(req, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(rows);
    });
  }

  //more methods here
}

module.exports = new AchievementLevelController();
