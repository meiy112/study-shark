// GroupController.js
const groupService = require('../services/GroupService');

class GroupController {
  // returns all groups user has joined
  getUserGroups(req, res) {
    groupService.getUserGroups(req.username)
    .then (rows => {
      res.send(rows);
    })
    .catch (err => {
        if (err.message == 'No username') {
            if (req.expired == 'true') {
              // return "Forbidden" if user was not authenticated because jwt expired
              res.status(403).send({message: 'Forbidden', 
                                      details: 'unidentified user tried to access groups, jwt expired'});
            } else {
              // return "Forbidden" if user was not authenticated
              res.status(403).send({message: 'Forbidden', 
                                      details: 'unidentified user tried to access groups'});
            }
          } else {
            // return 'Internal Service Error' if anything strange happens in the query 
            res.status(500).send({message: 'Internal Service Error', 
                                  details: 'Error executing query: getUserGroups'});
          }
          return;
    });
  }
}

module.exports = new GroupController();
