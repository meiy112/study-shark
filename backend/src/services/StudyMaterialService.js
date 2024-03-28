// achievementLevelService.js
const db = require('../configs/db');

class StudyMaterialService {
  // performs SQL query to get study materials.

  // gets all filtered and sorted study materials from a given topic 
  async getFilteredSortedStudyMaterial(topicId, type, sort) {

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
      // If sort option is lastOpened, execute the query 
      // we do this because the placeholder ? has issues with single quotes
      if (sort == 'lastOpened') {
        return new Promise ((resolve, reject) => {
          db.query("SELECT title, topicId, type, privacyInfo, description, DATE_FORMAT(lastOpened, '%M %d, %Y') AS lastOpened, parsedText, highScore FROM ContainsStudyMaterial csm WHERE topicId = ? AND type = ? ORDER BY lastOpened ASC", [topicId, type], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
          });
        })
      } else {
        // If sort option is alphebetical, execute the query with ORDER BY title ASC
        // we do this because the placeholder ? has issues with single quotes
        return new Promise ((resolve, reject) => {
          db.query("SELECT title, topicId, type, privacyInfo, description, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, parsedText, highScore FROM ContainsStudyMaterial csm WHERE topicId = ? AND type = ? ORDER BY title ASC", [topicId, type], (err, rows, fields) => {
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

  // deletes given study material from topic
  async deleteStudyMaterial(topicId, title, username) {
    // function to check if user does not have a topic
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

    // function to check if topic does not have a study material
    const checkTopicDoesNotHaveStudyMaterial = (title, topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT title FROM containsStudyMaterial WHERE topicId = ? AND title = ?'; 
          db.query(exists, [topicId, title], (err, rows, fields) => {
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
        // if topic does not have the study material return error "Topic does not have study material"
        if (await checkTopicDoesNotHaveStudyMaterial(title, topicId)) {
          const err = new Error("Topic does not have study material");
          throw err;
        }
        // delete study material from topic if there are no errors
        return new Promise ((resolve, reject) => {
          db.query('DELETE FROM containsstudymaterial WHERE topicId = ? AND title = ?', [topicId, title], (err, rows, fields) => {
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

module.exports = new StudyMaterialService();