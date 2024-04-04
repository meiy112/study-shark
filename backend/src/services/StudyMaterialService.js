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

    // function to check if topic does not exist
    const getQuizzes = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          var exists;
          if (sort == 'lastOpened') {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm.title AND oqq.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY lastOpened DESC";
          } else {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm.title AND oqq.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY title ASC"; 
          }
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    // function to check if topic does not exist
    const getFlashcards = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          var exists;
          if (sort == 'lastOpened') {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsCard oc WHERE oc.studyMatTitle = csm.title AND oc.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY lastOpened ASC";
          } else {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsCard oc WHERE oc.studyMatTitle = csm.title AND oc.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY title ASC"; 
          }
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    // function to check if topic does not exist
    const getNotes = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          var exists;
          if (sort == 'lastOpened') {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, csm.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm WHERE  csm.type = 'Notes' AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened, csm.parsedText ORDER BY lastOpened ASC";
          } else {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, csm.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm WHERE  csm.type = 'Notes' AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened, csm.parsedText ORDER BY title ASC";
          }
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    // function to check if topic does not exist
    const getAllStudyMaterial = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          const quiz = "SELECT csm1.title, csm1.type, DATE_FORMAT(csm1.lastOpened, '%M %d, %Y') AS lastOpened, csm1.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm1, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm1.title AND oqq.topicId = csm1.topicId AND csm1.topicId = ? GROUP BY csm1.title, csm1.type, lastOpened, csm1.parsedText UNION ";
          const flashcard = "SELECT csm2.title, csm2.type, DATE_FORMAT(csm2.lastOpened, '%M %d, %Y') AS lastOpened, csm2.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm2, OwnsCard oc WHERE oc.studyMatTitle = csm2.title AND oc.topicId = csm2.topicId AND csm2.topicId = ? GROUP BY csm2.title, csm2.type, lastOpened, csm2.parsedText UNION "; 
          const notes = "SELECT csm3.title, csm3.type, DATE_FORMAT(csm3.lastOpened, '%M %d, %Y') AS lastOpened, csm3.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm3 WHERE  csm3.type = 'Notes' AND csm3.topicId = ? GROUP BY csm3.title, csm3.type, lastOpened, csm3.parsedText "; 
          const orderByDate = "ORDER BY lastOpened ASC;";
          const orderByTitle = "ORDER BY title ASC;";
          var exists;
          if (sort == 'lastOpened') {
            exists = quiz + flashcard + notes + orderByDate;
          } else {
            exists = quiz + flashcard + notes + orderByTitle;
          }
          db.query(exists, [topicId, topicId, topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    try {
      // if topic does not exist return error "Error topic does not exist"
      if (await checkTopicDoesNotExist(topicId)) {
        const err = new Error("Error topic does not exist");
        throw err;
      }
      // return study material depending on the type
      const quiz = await getQuizzes(topicId, sort); 
      const flashcards = await getFlashcards(topicId, sort);
      const notes = await getNotes(topicId, sort);
      if (type == 'None') {
        return getAllStudyMaterial(topicId, sort);
      } else if (type == 'Quiz') {
        return quiz; 
      } else if (type == 'Flashcards' ) {
        return flashcards;
      } else {
        return notes; 
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

  // gets all featured study material
  async getFeaturedStudyMaterial(subject) {
    // function to check if subject is invalid 
    const checkSubjectInvalid = (subject) => {
      if (subject != "SCIENCE" && subject != "LANG" && subject != "MATH" && subject != "CREATIVE" && 
          subject != "GAM" && subject != "LIT" && subject.length != 0) {
            return true;
          }
          return false; 
    };

    try {
      // if subject is invalid, return an empty list
      if (checkSubjectInvalid(subject)) {
        return []; 
      }
      // gets all featured study material
      return new Promise ((resolve, reject) => {
        let query = "";
        const numQ = "(SELECT csm1.title, csm1.type, csm1.topicId, csm1.dateCreated AS idate, csm1.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm1, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm1.title AND oqq.topicId = csm1.topicId AND csm1.isPublic = TRUE GROUP BY csm1.title, csm1.type, csm1.topicId, idate, csm1.parsedText HAVING COUNT(*) <> 0 UNION "; 
        const numN = "SELECT csm3.title, csm3.type, csm3.topicId, csm3.dateCreated AS idate, csm3.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm3 WHERE  csm3.type = 'Notes' AND csm3.isPublic = TRUE GROUP BY csm3.title, csm3.type, csm3.topicId, idate, csm3.parsedText HAVING COUNT(*) <> 0) s "; 
        const numF = "SELECT csm2.title, csm2.type, csm2.topicId, csm2.dateCreated AS idate, csm2.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm2, OwnsCard oc WHERE oc.studyMatTitle = csm2.title AND oc.topicId = csm2.topicId AND csm2.isPublic = TRUE GROUP BY csm2.title, csm2.type, csm2.topicId, idate, csm2.parsedText HAVING COUNT(*) <> 0 UNION "; 
        if (subject.length == 0) {
          query = "SELECT DISTINCT s.title, s.type, DATE_FORMAT(s.idate, '%M %d, %Y') AS date, s.parsedText, s.numComponents, c.name, c.primaryColor, c.gradient, c.circle, t.title AS topicTitle FROM createsTopic t, color c, " + numQ + numF + numN + "WHERE s.topicId = t.id AND t.color = c.name ORDER BY STR_TO_DATE(date, '%M %d, %Y') DESC";
          db.query(query, (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
          });
        } else {
          query = "SELECT DISTINCT s.title, s.type, DATE_FORMAT(s.idate, '%M %d, %Y') AS date, s.parsedText, s.numComponents, c.name, c.primaryColor, c.gradient, c.circle, t.title AS topicTitle FROM createsTopic t, color c, has h, tag ta, " + numQ + numF + numN + "WHERE s.topicId = t.id AND t.color = c.name AND t.id = h.topicId AND h.tagName = ta.name AND ta.subject = ? ORDER BY STR_TO_DATE(date, '%M %d, %Y') DESC";
          db.query(query, [subject], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
          });
        }
      })
    } catch (error) {
      throw error; 
    } 
  }

  // posts a new study material
  async postStudyMaterial(title, username, type, topicId) {
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

    // function to check if study material already exists
    const checkStudyMaterialExists = (topicId, type, title) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT title FROM containsStudyMaterial c WHERE topicId = ? AND title = ?'; 
          db.query(exists, [topicId, type, title], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length != 0);
          });
      });
    };
    
    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err; 
      } 
      // if topic does not exist return error "Error topic does not exist"
      if (await checkTopicDoesNotExist(topicId)) {
        const err = new Error("Error topic does not exist");
        throw err;
      }
      // if user does not own the topic return error "User does not own topic"
      if (await checkUserDoesNotHaveTopic(username, topicId)) {
        const err = new Error("User does not own topic");
        throw err;
      }
      // if study material already exists return error "Study Material already exists"
      if (await checkStudyMaterialExists(topicId, title)) {
        const err = new Error("Study Material already exists");
        throw err;
      }
      const today = new Date();
      // console.log(topicId);
      // console.log(type);
      // console.log(title);
      const head = "INSERT INTO ContainsStudyMaterial (title, topicId, type, isPublic, description, lastOpened, dateCreated, parsedText, highScore) VALUES ";
      const values = "(?, ?, ?, ?, ?, ?, ?, ?, ?);";
      // posts a new topic
      return new Promise ((resolve, reject) => {
        db.query(head + values, [title, topicId, type, false, title, today, today, title, 0],
          (err, rows, fields) => {
            if (err) {
              console.log("uh oh")
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

module.exports = new StudyMaterialService();