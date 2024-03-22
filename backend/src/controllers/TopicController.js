// TopicController.js
const topicService = require('../services/TopicService');

class TopicController {
  // gets all user's topics
  getUserTopics(req, res) {
    topicService.getUserTopics(req.username)
    .then (rows => {
      res.send(rows);
    })
    .catch (err => {
      if (err.message == 'No username') {
        if (req.expired == 'true') {
          // return "Forbidden" if user was not authenticated because jwt expired
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access topics, jwt expired'});
        } else {
          // return "Forbidden" if user was not authenticated
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access topics'});
        }
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getUserTopics'});
      }
      return;
    });
  }

  // get all user's topics for the homepage
  getUserTopicsHomepage(req, res) {
    topicService.getUserTopicsHomepage(req.username) 
    .then (rows => {
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
    })
    .catch (err => {
      if (err.message == 'No username') {
        if (req.expired == 'true') {
          // return "Forbidden" if user was not authenticated because jwt expired
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access topics, jwt expired'});
        } else {
          // return "Forbidden" if user was not authenticated
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access topics'});
        }
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getUserTopicsHomepage'});
      }
      return;
    });
  }

  // gets a given topic's general info
  getUserTopicsGeneral(req, res) {
    topicService.getUserTopicsGeneral(req.params.id, req.username) 
    .then(rows => {
      res.send(rows);
    })
    .catch (err => {
      if (err.message == 'This topic is private') {
        // return "Forbidden" if topic is private and user is unauthenticated
        res.status(403).send({message: 'Forbidden', 
                                details: 'unidentified user tried to access private topic'});
      } else if (err.message == 'No topicId') {
        // return "Bad Request" if no topicId is given
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error no topicId given: getUserTopicsGeneral'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getUserTopicsGeneral'});
      }
      return;
    });
  }
  
  // gets all tags associated with a given topic
  getUserTopicsTags(req, res) {
    topicService.getUserTopicsTags(req.params.id, req.username)
    .then (rows => {
      res.send(rows);
    })
    .catch (err => {
      if (err.message == 'No username') {
        if (req.expired == 'true') {
          // return "Forbidden" if user was not authenticated because jwt expired
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access topics, jwt expired'});
        } else {
          // return "Forbidden" if user was not authenticated
          res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access topics'});
        }
      } else if (err.message == 'No topicId') {
        // return "Bad Request" if no topicId is given
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error no topicId given: getUserTopicsTags'});
      } else if (err.message == 'User does not own topic') {
        // return "Bad Request" if user does not own topic
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error user does not own topic: getUserTopicsTags'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getUserTopicsTags'});
      }
      return;
    });
  }
}

module.exports = new TopicController();
