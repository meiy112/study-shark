// TopicService.js
const db = require('../configs/db');

class TopicService {
  // performs SQL query to get topics.

  // gets all topics belonging to the user
  async getUserTopics(username) {
    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err; 
      } 
      // else return all topics belonging to the user
      return new Promise ((resolve, reject) => {
        db.query("SELECT id, username, title, isPublic, description, DATE_FORMAT(T.lastOpened, '%M %d, %Y') AS lastOpened, color FROM createstopic T WHERE username = ?", [username], (err, rows, fields) => {
          if (err) {
              reject(err);
              return;
          }
          resolve(rows);
        });
      })
    } catch (error) {
      throw error; 
    }
  }

  // gets all topics belonging to the user in homepage format
  async getUserTopicsHomepage(username) {
    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err;
      }
      // else return all topics belonging to user in homepage format
      return new Promise ((resolve, reject) => {
        db.query("SELECT T1.id, T1.title, T1.isPublic, DATE_FORMAT(T1.lastOpened, '%M %d, %Y') AS lastOpened, (SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Flashcards' AND T1.id = csm.topicId) AS numF, (SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Quiz' AND T1.id = csm.topicId) AS numQ, (SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Notes' AND T1.id = csm.topicId) AS numN, T1.color, primaryColor, gradient, circle FROM createsTopic T1, color c WHERE T1.username = ? AND T1.color = c.name", 
          [username], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
          resolve(rows);
          });
      })
    } catch (error) {
      throw error;
    }
  }

  // gets a given topic's general information
  async getUserTopicsGeneral(topicId, username) {
    // function to check if topic is private
    const checkTopicIsPrivate = (topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT id FROM createstopic WHERE id = ? AND isPublic = true'; 
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length == 0);
          });
      });
    };

    try {
      // if no topicId is given return error "No topicId"
      if (!topicId) {
        const err = new Error("No topicId");
        throw err; 
      }
      if (await checkTopicIsPrivate(topicId)) {
        // if topic is private and user is not authenticated return error "This topic is private"
        if (username == 'no user') {
          const err = new Error("This topic is private");
          throw err;
        }
      }
      // else return the given topic's general information
      return new Promise ((resolve, reject) => {
        db.query('SELECT id, title, description FROM createstopic WHERE id = ?', 
          [topicId], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
          resolve(rows[0]);
          });
      })
    } catch (error) {
      throw error; 
    }
  }

  // gets all tags associated with the given topic
  async getUserTopicsTags(topicId, username) {
    // function to check if user does not have the given topic
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
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err;
      } else if (!topicId) {
        // if no topicId is given return error "No topicId"
        const err = new Error("No topicId");
        throw err;
      } else {
        // if user does not own the topic return error "User does not own topic"
        if (await checkUserDoesNotHaveTopic(username, topicId)) {
          const err = new Error("User does not own topic");
          throw err;
        }
        // else return all tags associated with the given topic
        return new Promise ((resolve, reject) => {
          db.query('SELECT * FROM tag ta WHERE NOT EXISTS (SELECT T.id FROM createsTopic T WHERE NOT EXISTS (SELECT tagName FROM has WHERE ? = has.topicId AND has.tagName = ta.name));', 
            [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
            resolve(rows);
            });
        })
      }
    } catch (error) {
      throw error; 
    } 
  }
}

module.exports = new TopicService();