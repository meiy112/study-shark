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

  // posts all topics belonging to the user in homepage format
  async postUserTopicsHomepage(username, filterList, sort, searchQuery) {
    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err;
      }
      const create = "CREATE TABLE Temp (tag VARCHAR(255)); ";
      let insert = "";
      for (let obj of filterList) {
        insert += "INSERT INTO `Temp` (`tag`) VALUES ('" + obj + "'); ";
      }
      const drop = "DROP TABLE Temp;";

      const head = "SELECT T1.id, T1.title, T1.isPublic, DATE_FORMAT(T1.lastOpened, '%M %d, %Y') AS lastOpened, ";
      const numF = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Flashcards' AND T1.id = csm.topicId) AS numF, "; 
      const numQ = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Quiz' AND T1.id = csm.topicId) AS numQ, "; 
      const numN = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Notes' AND T1.id = csm.topicId) AS numN, "; 
      const tail = "T1.color, primaryColor, gradient, circle FROM createsTopic T1, color c WHERE T1.username = ? AND T1.color = c.name AND ";
      const division = "NOT EXISTS (SELECT Temp.tag FROM Temp WHERE NOT EXISTS (SELECT h1.topicId FROM Has h1 WHERE h1.tagName = Temp.tag AND h1.topicId = T1.id)) ";
      const sQ = "T1.title LIKE '%" + searchQuery + "%' AND ";
      let orderBy = "";
      let query = "";

      if (sort == "lastOpened") {
        orderBy = "ORDER BY T1.lastOpened ASC; ";
      } else {
        orderBy = "ORDER BY T1.title ASC; ";
      }

      // else return all topics belonging to user in homepage format
      if (searchQuery == "") {
        //console.log(create + insert + head + numF + numQ + numN + tail + division + orderBy + drop);
        query = create + insert + head + numF + numQ + numN + tail + division + orderBy + drop;
      } else {
        query = create + insert + head + numF + numQ + numN + tail + sQ + division + orderBy + drop;
      }
      return new Promise ((resolve, reject) => {
        //console.log(query);
        db.query(query, [username], (err, rows, fields) => {
            //console.log(rows);
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
        db.query('SELECT id, title, description, username FROM createstopic WHERE id = ?', 
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
  async getUserTopicsTags(topicId) {
    // function to check if topic does not exist
    const checkTopicDoesNotExist = (topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT id FROM createstopic WHERE id = ?'; 
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
      // if topic does not exist return error "Error topic does not exist"
      if (await checkTopicDoesNotExist(topicId)) {
        const err = new Error("Error topic does not exist");
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
    } catch (error) {
      throw error; 
    } 
  }

  // gets all topics belonging to the user in homepage format
  async getFeaturedTopics(subject) {
    const head = "SELECT DISTINCT T1.id, T1.title, DATE_FORMAT(T1.dateCreated, '%M %d, %Y') AS date, ";
    const numF = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Flashcards' AND T1.id = csm.topicId) AS numF, ";
    const numQ = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Quiz' AND T1.id = csm.topicId) AS numQ, ";
    const numN = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Notes' AND T1.id = csm.topicId) AS numN, ";
    const tail = "T1.color, primaryColor, gradient, circle FROM createsTopic T1, color c WHERE T1.color = c.name AND T1.isPublic = TRUE ORDER BY date DESC;";
    const atail = "T1.color, primaryColor, gradient, circle FROM createsTopic T1, color c, Has h, Tag t WHERE T1.color = c.name AND t1.id = h.topicId AND h.tagName = t.name AND t.subject = ? AND T1.isPublic = TRUE ORDER BY date DESC;";
    try {
      if (subject == "") {
        // return all topics belonging to user in homepage format
        return new Promise ((resolve, reject) => {
          db.query(head + numF + numQ + numN + tail,
            (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
            resolve(rows);
            });
        })
      } else { 
        // return all topics belonging to user in homepage format
        return new Promise ((resolve, reject) => {
          db.query(head + numF + numQ + numN + atail,
            [subject], (err, rows, fields) => {
              if (rows.length == 0) {
                // if query returns an empty array, return error "This subject does not have a public topic"
                const error = new Error("This subject does not have a public topic");
                reject(error);
                return; 
              }
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