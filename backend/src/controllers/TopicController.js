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

  // post all user's topics for the homepage
  postUserTopicsHomepage(req, res) {
    topicService.postUserTopicsHomepage(req.username, req.body.filterList, req.query.sort, req.query.searchQuery) 
    .then (rows => {
      // console.log(rows);
      const arrays = rows.filter(element => Array.isArray(element));
      // console.log(arrays[0]);
      // process color object 
      const newRows = arrays[0].map(obj => {
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
                              details: 'Error executing query: postUserTopicsHomepage'});
      }
      return;
    });
  }


  // gets a given topic's general info
  getUserTopicsGeneral(req, res) {
    topicService.getUserTopicsGeneral(req.params.id, req.username) 
    .then(rows => {
      if (req.username == rows.username) {
        rows.isOwner = true; 
      } else {
        rows.isOwner = false;
      }
      delete rows.username;
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
    topicService.getUserTopicsTags(req.params.id)
    .then (rows => {
      res.send(rows);
    })
    .catch (err => {
      // Return 'Bad Request' if topic ID is invalid
      if (err.message == 'Error topic does not exist') {
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error topic does not exist: getUserTopicsTags'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
      res.status(500).send({message: 'Internal Service Error', 
                            details: 'Error executing query: getUserTopicsTags'});
      }
      return;
    });
  }

  getFeaturedTopics(req, res) {
    topicService.getFeaturedTopics(req.query.subject) 
    .then (rows => {
      // process color object 
      const newRows = rows.map(obj => {
        return {
          id: obj.id,
          title: obj.title,
          date: obj.date,
          numNotes: obj.numN,
          numCards: obj.numF, 
          numQuizzes: obj.numQ,
          color: {name: obj.color, primary: obj.primaryColor, gradient: obj.gradient, circle: obj.circle},
        }
      });
      res.send(newRows);
    })
    .catch (err => {
      if (err.message == 'This subject does not have a public topic') {
        // return "Bad Request" if this subject does not have a public topic
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error this subject does not have a public topic: getFeaturedTopics'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getFeaturedTopics'});
      }
      return;
    });
  }
}

module.exports = new TopicController();
