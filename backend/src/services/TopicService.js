// TopicService.js
const db = require('../configs/db');

class TopicService {
  // performs SQL query to get topics.

  // gets all topics belonging to the user
  getUserTopics(username, callback) {
    if (!username) {
      const err = new Error("No username");
      callback(err,{});
    } else {
      db.query('SELECT * FROM createstopic WHERE username = ?', [username], (err, rows, fields) => {
        callback(err, rows);
      });
    }
  }

  // gets all topics belonging to the user in homepage format
  getUserTopicsHomepage(username, callback) {
    if (!username) {
      const err = new Error("No username");
      callback(err,{});
    } else {
      db.query("SELECT T1.id, T1.title, T1.isPublic, T1.lastOpened, (SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Flashcards' AND T1.id = csm.topicId) AS numF, (SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Quiz' AND T1.id = csm.topicId) AS numQ, (SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Notes' AND T1.id = csm.topicId) AS numN, T1.color, primaryColor, gradient, circle FROM createsTopic T1, color c WHERE T1.username = ? AND T1.color = c.name", 
        [username], (err, rows, fields) => { callback(err, rows);
      });
    }
  }

  // gets a given topic's general information
  getUserTopicsGeneral(topicId, username, callback) {
    if (!username) {
      const err = new Error("No username");
      callback(err,{});
    } else if (!topicId) {
      const err = new Error("No topicId");
      callback(err,{});
    } else {
      db.query('SELECT id, title, description FROM createstopic WHERE username = ? AND id = ?', 
        [username, topicId], (err, rows, fields) => {
        callback(err, rows);
      });
    }
  }

  // gets all tags associated with the given topic
  async getUserTopicsTags(topicId, username, callback) {
    const checkUserDoesNotHaveTopic = (username, topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT id FROM createstopic WHERE username = ? AND id = ?'; 
          db.query(exists, [username, topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length == 0);
          });
      });
    };

    try {
      if (!username) {
        const err = new Error("No username");
        callback(err,{});
      } else if (!topicId) {
        const err = new Error("No topicId");
        callback(err,{});
      } else {
        if (await checkUserDoesNotHaveTopic(username, topicId)) {
          const err = new Error("User does not own topic");
          callback(err,{});
        }

        db.query('SELECT * FROM tag ta WHERE NOT EXISTS (SELECT T.id FROM createsTopic T WHERE NOT EXISTS (SELECT tagName FROM has WHERE ? = has.topicId AND has.tagName = ta.name));', 
          [topicId], (err, rows, fields) => {
          callback(err, rows);
        });
      }
    } catch (error) {
      throw error; 
    } 
  }
}

module.exports = new TopicService();