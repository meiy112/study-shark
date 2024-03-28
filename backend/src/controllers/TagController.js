// TagController.js
const tagService = require('../services/TagService');

class TagController {
  // gets all the tags of all the topics belonging to the current user
  getAllTagsOfTopicsFromUser(req, res) {
    tagService.getAllTagsOfTopicsFromUser(req.username, (err, rows) => {
      if (err) {
        if (err.message == 'unidentified user tried to access tags') {
          // return "Forbidden" if user was not authenticated because jwt expired
          if (req.expired == "true") {
            res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access tags, jwt expired'});
            return;
          } else {
            // return "Forbidden" if user was not authenticated
            res.status(403).send({message: 'Forbidden', 
                                  details: 'unidentified user tried to access tags'});
            return;
          }
        }
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getAllTagsOfTopicsFromUser'});
        return;
      }
      res.send(rows);
    });
  }
}

module.exports = new TagController();
