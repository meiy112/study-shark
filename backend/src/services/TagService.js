// TagService.js
const db = require('../configs/db');

class TagService {
  // performs SQL query to get tags.

  // gets all the tags of all the topics belonging to the current user
  getAllTagsOfTopicsFromUser(username, callback) {
    // if user is not authenticated return error "unidentified user tried to access tags"
    if (username == 'no user') {
      const err = new Error("unidentified user tried to access tags");
      callback(err, {});
    } else {
      // else return all tags from topics belonging to the current user
      db.query('SELECT DISTINCT t.name, t.color FROM createstopic c, has h, tag t WHERE username = ? AND c.id = h.topicId AND t.name = h.tagName ', [username], (err, rows, fields) => {
        callback(err, rows);
      });
    }
  }
}

module.exports = new TagService();