// achievementLevelController.js
const studyMaterialService = require('../services/StudyMaterialService');

class StudyMaterialController {
  // gets all filtered and sorted study materials from a given topic 
  getFilteredSortedStudyMaterial(req, res) {
    const words_per_page = 2;
    studyMaterialService.getFilteredSortedStudyMaterial(req.params.id, req.query.type, req.query.sort)
    .then(rows => {
      for (var obj of rows) {
        if (obj.type === 'Notes') {
          const spaces = obj.parsedText.match(/ /g) || [];
          const num_words = spaces.length + 1; 
          obj.numComponents = Math.ceil(num_words / words_per_page); 
        }
        delete obj.parsedText;
      }
      res.send(rows);
    })
    .catch(err => {
      // Return 'Bad Request' if topic ID is invalid
      if (err.message == 'Error topic does not exist') {
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error topic does not exist: getFilteredSortedStudyMaterial'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getFilteredSortedStudyMaterial'});
      }
      return;
    });
  }

  
  // deletes given study material from topic
  deleteStudyMaterial(req, res) {
    studyMaterialService.deleteStudyMaterial(req.params.id, req.params.title, req.username)
    .then(() => {
      res.send("Study material: " + req.params.title + " from Topic: " + req.params.id + " deleted successfully");
    })
    .catch(err => {
      if (err.message == 'No username') {
        if (req.expired == 'true') {
          // return "Forbidden" if user was not authenticated because jwt expired
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to delete study material, jwt expired'});
        } else {
          // return "Forbidden" if user was not authenticated
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to delete study material'});
        }
      } else if (err.message == 'No topicId') {
        // return "Bad Request" if no topicId is given
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error no topicId given: deleteStudyMaterial'});
      } else if (err.message == 'User does not own topic') {
        // return "Bad Request" if user does not own topic
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error user does not own topic: deleteStudyMaterial'});
      } else if (err.message == 'Topic does not have study material') {
        // return "Bad Request" if topic does not have study material
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error topic does not have study material: deleteStudyMaterial'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: deleteStudyMaterial'});
      }
      return;
    })
  }

  // gets all featured study material
  getFeaturedStudyMaterial(req, res) {
    const words_per_page = 2;
    studyMaterialService.getFeaturedStudyMaterial(req.query.subject)
    .then(rows => {
      for (var obj of rows) {
        if (obj.type === 'Notes') {
          const spaces = obj.parsedText.match(/ /g) || [];
          const num_words = spaces.length + 1; 
          obj.numComponents = Math.ceil(num_words / words_per_page); 
        }
        delete obj.parsedText;
      }
      // process color object 
      const newRows = rows.map(obj => {
        return {
          title: obj.title,
          type: obj.type,
          date: obj.date,
          numComponents: obj.numComponents,
          color: {name: obj.color, primary: obj.primaryColor, gradient: obj.gradient, circle: obj.circle},
          topicTitle: obj.topicTitle,
        }
      });
      res.send(newRows);
    })
    .catch(err => {
      // return 'Internal Service Error' if anything strange happens in the query 
      res.status(500).send({message: 'Internal Service Error', 
                            details: 'Error executing query: getFeaturedStudyMaterial'});
      return;
    });
  }

  // posts a new studyMaterial
  postStudyMaterial(req, res) {
    studyMaterialService.postStudyMaterial(req.body.title, req.username, req.body.type, req.body.topicId) 
      .then (() => {
        res.send({ message: "Topic: " + req.body.title + " created successfully"});
        // res.send("Topic: " + req.body.title + " created successfully");
      })
      .catch (err => {
        if (err.message == 'No username') {
          if (req.expired == 'true') {
            // return "Forbidden" if user was not authenticated because jwt expired
            res.status(403).send({message: 'Forbidden', 
                                    details: 'unidentified user tried to access study materials, jwt expired'});
          } else {
            // return "Forbidden" if user was not authenticated
            res.status(403).send({message: 'Forbidden', 
                                    details: 'unidentified user tried to access study materials'});
          }
        } else if (err.message == 'Error topic does not exist') {
          // Return 'Bad Request' if topic ID is invalid
          res.status(400).send({message: 'Bad Request', 
                                details: 'Error topic does not exist: postStudyMaterial'});
        } else if (err.message == 'User does not own topic') {
          // return "Bad Request" if user does not own topic
          res.status(400).send({message: 'Bad Request', 
                                details: 'Error user does not own topic: postStudyMaterial'});
        } else if (err.message == 'Study Material already exists') {
          // return "Bad Request" if study material already exists
          res.status(400).send({message: 'Bad Request', 
                                details: 'Error study material already exists: postStudyMaterial'});
        } else {
          // return 'Internal Service Error' if anything strange happens in the query 
          res.status(500).send({message: 'Internal Service Error', 
                                details: 'Error executing query: postStudyMaterial'});
        }
        return;
      });
    }
}

module.exports = new StudyMaterialController();
