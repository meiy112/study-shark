// achievementLevelController.js
const studyMaterialService = require('../services/StudyMaterialService');

class StudyMaterialController {
  // gets all filtered and sorted study materials from a given topic 
  getFilteredSortedStudyMaterial(req, res) {
    studyMaterialService.getFilteredSortedStudyMaterial(req.params.id, req.body.type, req.body.sort, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(301).send('Error executing query: getFilteredSortedStudyMaterial, ', err.message);
        return;
      }
      res.send(rows);
    });
  }

  
  // deletes given study material from topic
  deleteStudyMaterial(req, res) {
    studyMaterialService.deleteStudyMaterial(req.params.id, req.params.title, req.username, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(302).send('Error executing query: deleteStudyMaterial, ', err.message);
        return;
      }
      res.send("Study material: " + req.params.title + " from Topic: " + req.params.id + " deleted successfully");
    });
  }
}

module.exports = new StudyMaterialController();
