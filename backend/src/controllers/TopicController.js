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
      // return 'Internal Service Error' if anything strange happens in the query 
      res.status(500).send({message: 'Internal Service Error', 
                            details: 'Error executing query: getFeaturedTopics'});
      return;
    });
  }

  // gets a given topic's settings info
  getTopicSettings(req, res) {
    topicService.getTopicSettings(req.params.id) 
    .then (rows => {
      const tags = rows[0].map((item) => {
        return item.tagName;
      }); 
      const data = rows[1];
      const newRows = { 
        title: data.title, 
        description: data.description,
        creationDate: data.creationDate, 
        tags: tags, 
        isPublic: data.isPublic, 
        owner: { name: data.username, points: data.points },
        color: data.color
      }
      res.send(newRows);
    })
    .catch (err => {
      if (err.message == 'Error topic does not exist') {
        // return 'Bad Request' if topicId does not exist 
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error topic does not exist: getTopicSettings'});
      } else if (err.message == 'No topicId') {
        // return "Bad Request" if no topicId is given
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error no topicId given: getTopicSettings'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getTopicSettings'});
      }
      return;
    });
  }

  // updates given topic
  putTopic(req, res) {
    topicService.putTopic(req.params.id, req.body.title, req.body.isPublic, req.body.description, req.body.color, req.username) 
    .then (rows => {
      const arrays = rows.filter(element => Array.isArray(element));
      res.send(arrays[0]);
    })
    .catch (err => {
      if (err.message == 'Error topic does not exist') {
        // return 'Bad Request' if topicId does not exist 
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error topic does not exist: putTopic'});
      } else if (err.message == 'No topicId') {
        // return "Bad Request" if no topicId is given
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error no topicId given: putTopic'});
      } else if (err.message == 'Error user does not own topic') {
        // return "Forbidden" if user does not own topic
        res.status(403).send({message: 'Forbidden', 
                              details: 'Error user does not own topic: putTopic'});
      } else if (err.message == 'Error color does not exist') {
        // return "Bad Request" if color does not exist
        res.status(400).send({message: 'Bad Request', 
                              details: 'Error color does not exist: putTopic'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: putTopic'});
      }
      return;
    });
  }

  // deletes given topic
  deleteTopic(req, res) {
    topicService.deleteTopic(req.params.id, req.username) 
      .then (() => {
        res.send("Topic: " + req.params.id + " deleted successfully");
      })
      .catch (err => {
        if (err.message == 'Error topic does not exist') {
          // return 'Bad Request' if topicId does not exist 
          res.status(400).send({message: 'Bad Request', 
                                details: 'Error topic does not exist: deleteTopic'});
        } else if (err.message == 'No topicId') {
          // return "Bad Request" if no topicId is given
          res.status(400).send({message: 'Bad Request', 
                                details: 'Error no topicId given: deleteTopic'});
        } else if (err.message == 'Error user does not own topic') {
          // return "Forbidden" if user does not own topic
          res.status(403).send({message: 'Forbidden', 
                                details: 'Error user does not own topic: deleteTopic'});
        } else {
          // return 'Internal Service Error' if anything strange happens in the query 
          res.status(500).send({message: 'Internal Service Error', 
                                details: 'Error executing query: deleteTopic'});
        }
        return;
      });
    }

    // posts a new topic
    postTopic(req, res) {
      topicService.postTopic(req.body.title, req.username) 
        .then (() => {
          res.send("Topic: " + req.body.title + " created successfully");
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
                                  details: 'Error executing query: postTopic'});
          }
          return;
        });
      }
}

module.exports = new TopicController();
