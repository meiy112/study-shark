// ColorService.js
const db = require('../configs/db');

class ColorService {
  // performs SQL query to get color info.
  // gets all colors from databse
  async getAllColors() {
    try {
      // return colors
      return new Promise ((resolve, reject) => {
        db.query("SELECT name, primaryColor AS `primary`, gradient, circle FROM Color;", (err, rows, fields) => {
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

}

module.exports = new ColorService();