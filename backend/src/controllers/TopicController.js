// achievementLevelController.js
const topicService = require('../services/TopicService');

class TopicController {
  // gets all user's topics
  getUserTopics(req, res) {
    topicService.getUserTopics(req.username, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(501).send('Error executing query: getUserTopics, ', err.message);
        return;
      }
      res.send(rows);
    });
  }

  // get all user's topics for the homepage
  getUserTopicsHomepage(req, res) {
    topicService.getUserTopicsHomepage(req.username, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(502).send('Error executing query: getUserTopicsHomepage, ', err.message);
        return;
      }
      // process color object 
      const newRows = rows.map(obj => {
        return {
          id: obj.id,
          title: obj.title,
          isPublic: obj.isPublic,
          date: obj.lastOpened,
          numNotes: obj.numN,
          numCards: obj.numF, 
          numQuizzes: obj.numQ,
          color: {name: obj.color, primary: obj.primaryColor, gradient: obj.gradient, circle: obj.circle},
        }
      });
      res.send(newRows);
    });
  }

  // gets a given topic's general info
  getUserTopicsGeneral(req, res) {
    topicService.getUserTopicsGeneral(req.params.id, req.username, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(503).send('Error executing query: getUserTopicsGeneral, ', err.message);
        return;
      }
      res.send(rows);
    });
  }
  
  // gets all tags associated with a given topic
  getUserTopicsTags(req, res) {
    topicService.getUserTopicsTags(req.params.id, req.username, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(504).send('Error executing query: getUserTopicsTags, ', err.message);
        return;
      }
      res.send(rows);
    });
  }
}

module.exports = new TopicController();
