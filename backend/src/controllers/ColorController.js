// ColorController.js
const colorService = require('../services/ColorService');

class ColorController {
    // gets all colors from the database
    getAllColors(req, res) {
        colorService.getAllColors()
        .then (rows => {
          res.send(rows);
        })
        .catch (err => {
            // return 'Internal Service Error' if query is invalid
            res.status(500).send({message: 'Internal Service Error', 
                                details: 'Error executing query: getAllColors'});
        });
      }
 
}

module.exports = new ColorController();
