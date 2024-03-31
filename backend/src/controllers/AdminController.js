// AdminController.js
const adminService = require('../services/AdminService');

class AdminController {
  // gets all user specified topics
  getAdminTopics(req, res) {
    adminService.getAdminTopics(req.query.query, req.username)
    .then (rows => {
      res.send(rows);
    })
    .catch (err => {
      if (err.message == 'Not admin') {
        if (req.expired == 'true') {
          // return "Bad Request" if user is not admin because jwt expired
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access admin info, jwt expired'});
        } else {
          // return "Bad Request" if user is not admin
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access admin info'});
        }
      } else {
        // return 'Bad Request' if query is invalid
        res.status(400).send({message: 'Bad Request', 
                              details: 'Invalid query string: getAdminTopics'});
      }
      return;
    });
  }

  // returns tuples given attribute list and table
  postAdminTable(req, res) {
    adminService.postAdminTable(req.query.name, req.body.attrList, req.username)
    .then (rows => {
      res.send(rows);
    })
    .catch (err => {
      if (err.message == 'Not admin') {
        if (req.expired == 'true') {
          // return "Bad Request" if user is not admin because jwt expired
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access admin info, jwt expired'});
        } else {
          // return "Bad Request" if user is not admin
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access admin info'});
        }
      } else if (err.message == 'table does not exist') {
        // return "Bad Request" if table does not exist
        res.status(400).send({message: 'Bad Request', 
                              details: 'table does not exist in the database'});
      } else if (err.message == 'no attributes provided') {
        // return "Bad Request" if no attributes provided
        res.status(400).send({message: 'Bad Request', 
                              details: 'no attributes provided'});
      } else if (err.message == 'attribute not in table') {
        // return "Bad Request" if one of the attributes in the list is not in the table
        res.status(400).send({message: 'Bad Request', 
                              details: 'one of the attributes is not in the given table'});
      } else {
        // return 'Internal Service Error' if query is invalid
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: postAdminTable'});
      }
      return;
    });
  }
}

module.exports = new AdminController();
