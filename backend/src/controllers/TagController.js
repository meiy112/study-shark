// achievementLevelController.js
const tagService = require('../services/TagService');

class TagController {
  // gets all the stuff
  getAllTagsOfTopicsFromUser(req, res) {
    tagService.getAllTagsOfTopicsFromUser(req.username, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(rows);
    });
  }

//   postAchievementLevel(req, res) {
//     achievementLevelService.postAchievementLevel(req, (err, rows) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }
//       res.send(rows);
//     });
//   }

  //more methods here
}

module.exports = new TagController();
