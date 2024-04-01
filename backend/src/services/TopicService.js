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
      if (searchQuery.length == 0) {
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

  // gets all featured topics
  async getFeaturedTopics(subject) {
    // function to check if subject is invalid 
    const checkSubjectInvalid = (subject) => {
      if (subject != "SCIENCE" && subject != "LANG" && subject != "MATH" && subject != "CREATIVE" && 
          subject != "GAM" && subject != "LIT" && subject.length != 0) {
            return true;
          }
          return false; 
    };
    const head = "SELECT DISTINCT T1.id, T1.title, DATE_FORMAT(T1.dateCreated, '%M %d, %Y') AS date, ";
    const numF = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Flashcards' AND T1.id = csm.topicId) AS numF, ";
    const numQ = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Quiz' AND T1.id = csm.topicId) AS numQ, ";
    const numN = "(SELECT COUNT(*) FROM createsTopic T, containsstudymaterial csm WHERE T.id = csm.topicId AND csm.type = 'Notes' AND T1.id = csm.topicId) AS numN, ";
    const tail = "T1.color, primaryColor, gradient, circle FROM createsTopic T1, color c WHERE T1.color = c.name AND T1.isPublic = TRUE ORDER BY date DESC;";
    const atail = "T1.color, primaryColor, gradient, circle FROM createsTopic T1, color c, Has h, Tag t WHERE T1.color = c.name AND t1.id = h.topicId AND h.tagName = t.name AND t.subject = ? AND T1.isPublic = TRUE ORDER BY date DESC;";
    try {
      // if subject is invalid, return an empty list
      if (checkSubjectInvalid(subject)) {
        return []; 
      }
      if (subject.length == 0) {
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

  // gets a given topic's settings info
  async getTopicSettings(topicId) {
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

    // function to get tags from topic 
    const getTopicTags = (topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT tagName FROM Has WHERE topicId = ?'; 
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    // get topic's settings data
    const getData = (topicId) => {
      const head = "SELECT title, description, DATE_FORMAT(dateCreated, '%M %d, %Y') AS creationDate, id AS tags, isPublic, t.username, u.points, t.color "; 
      const tail = "FROM createstopic t, user u WHERE id = ? AND t.username = u.username;";
      return new Promise ((resolve, reject) => {
        db.query(head + tail,  
          [topicId], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
          resolve(rows[0]);
          });
      })
    };

    try {
      // if topic does not exist return error "Error topic does not exist"
      if (await checkTopicDoesNotExist(topicId)) {
        const err = new Error("Error topic does not exist");
        throw err;
      }

      // if no topicId is given return error "No topicId"
      if (topicId.length == 0) {
        const err = new Error("No topicId");
        throw err; 
      }
      const tags = await getTopicTags(topicId);
      const data = await getData(topicId);
      return [tags, data];
      
    } catch (error) {
      throw error; 
    }
  }

  // updates given topic
  async putTopic(topicId, title, isPublic, description, color, username) {
    // function to check if user is not the owner of the topic
    const checkUserDoesNotOwnTopic = (topicId, username) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT id FROM createstopic WHERE id = ? AND username = ?'; 
          db.query(exists, [topicId, username], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length == 0);
          });
      });
    };

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

    // function to check if color does not exist
    const checkColorDoesNotExist = (color) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT name FROM color WHERE name = ?'; 
          db.query(exists, [color], (err, rows, fields) => {
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
      if (topicId.length == 0) {
        const err = new Error("No topicId");
        throw err; 
      }
      // if topic does not exist return error "Error topic does not exist"
      if (await checkTopicDoesNotExist(topicId)) {
        const err = new Error("Error topic does not exist");
        throw err;
      }
      // if user does not own topic return error "Error user does not own topic"
      if (await checkUserDoesNotOwnTopic(topicId, username)) {
        const err = new Error("Error user does not own topic");
        throw err; 
      }
      // if color does not exist return error "Error color does not exist"
      if (await checkColorDoesNotExist(color)) {
        const err = new Error("Error color does not exist");
        throw err;
      }
      
      const update = "UPDATE createsTopic SET title = ?, isPublic = ?, description = ?, color = ?, lastOpened = NOW() WHERE id = ?; ";
      const query = "SELECT * FROM createsTopic WHERE id = ?";
      // updates topic with given information and returns it
      return new Promise ((resolve, reject) => {
        db.query(update + query, [title, isPublic, description, color, topicId, topicId], 
          (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
          resolve(rows);
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // deletes given topic
  async deleteTopic(topicId, username) {
    // function to check if user is not the owner of the topic
    const checkUserDoesNotOwnTopic = (topicId, username) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT id FROM createstopic WHERE id = ? AND username = ?'; 
          db.query(exists, [topicId, username], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length == 0);
          });
      });
    };

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
      // if no topicId is given return error "No topicId"
      if (topicId.length == 0) {
        const err = new Error("No topicId");
        throw err; 
      }
      // if topic does not exist return error "Error topic does not exist"
      if (await checkTopicDoesNotExist(topicId)) {
        const err = new Error("Error topic does not exist");
        throw err;
      }
      // if user does not own topic return error "Error user does not own topic"
      if (await checkUserDoesNotOwnTopic(topicId, username)) {
        const err = new Error("Error user does not own topic");
        throw err; 
      }
      
      const query = "DELETE FROM createsTopic WHERE id = ?";
      // deletes given topic
      return new Promise ((resolve, reject) => {
        db.query(query, [topicId], 
          (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
          resolve(rows);
          });
      });
    } catch (error) {
      throw error;
    }
  }

  // posts a new topic
  async postTopic(title, username) {
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
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err; 
      } 
      // generate a new topicId 
      const max = 9999999;
      let topicId = 0;
      for (let i = 0; i < max; i++) {
        topicId = Math.floor(Math.random() * (max + 1));
        if (await checkTopicDoesNotExist(topicId)) {
          break;
        }
      }
      const id = topicId.toString();
      const today = new Date();
      // console.log(topicId);
      // console.log(id);
      const head = "INSERT INTO createsTopic (id, username, title, isPublic, description, lastOpened, dateCreated, color) VALUES ";
      const values = "(?, ?, ?, ?, ?, ?, ?, ?);";
      // posts a new topic
      return new Promise ((resolve, reject) => {
        db.query(head + values, [id, username, title, false, '', today, today, 'default'],
          (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
          resolve(rows);
          });
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TopicService();