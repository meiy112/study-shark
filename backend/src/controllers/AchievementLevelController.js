// achievementLevelController.js
const achievementLevelService = require('../services/AchievementLevelService');

class AchievementLevelController {
  // gets all AchievementLevels
  getAllAchievementLevels(req, res) {
    achievementLevelService.getAllAchievementLevels((err, rows) => {
      if (err) {
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getAllAchievementLevels'});
        return;
      }
      res.send(rows);
    });
  }

  postAchievementLevel(req, res) {
    achievementLevelService.postAchievementLevel(req, (err, rows) => {
      if (err) {
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: postAchievementLevel'});
        return;
      }
      res.send(rows);
    });
  }
}

module.exports = new AchievementLevelController();
