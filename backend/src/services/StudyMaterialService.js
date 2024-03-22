// achievementLevelService.js
const db = require('../configs/db');

class StudyMaterialService {
  // performs SQL query to get study materials.

  // gets all filtered and sorted study materials from a given topic 
  getFilteredSortedStudyMaterial(topicId, type, sort, callback) {
    if (sort == 'lastOpened') {
      db.query('SELECT * FROM ContainsStudyMaterial WHERE topicId = ? AND type = ? ORDER BY lastOpened ASC', [topicId, type], (err, rows, fields) => {
        callback(err, rows);
      });
    } else {
      db.query('SELECT * FROM ContainsStudyMaterial WHERE topicId = ? AND type = ? ORDER BY title ASC', [topicId, type], (err, rows, fields) => {
        callback(err, rows);
      });
    }
  }

  // deletes given study material from topic
  async deleteStudyMaterial(topicId, title, username, callback) {
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

        if (await checkTopicDoesNotHaveStudyMaterial(title, topicId)) {
          const err = new Error("Topic does not have study material");
          callback(err,{});
        }

        db.query('DELETE FROM containsstudymaterial WHERE topicId = ? AND title = ?', 
          [topicId, title], (err, rows, fields) => {
          callback(err, rows);
        });
      }
    } catch (error) {
      throw error; 
    } 
  }
}

module.exports = new StudyMaterialService();