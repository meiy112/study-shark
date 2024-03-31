// AdminController.js
const adminService = require('../services/AdminService');

class AdminController {
  // gets all user specified topics
  getAdminTopics(req, res) {
    let newStr = req.query.query.slice(1, -1);
    adminService.getAdminTopics(newStr, req.username)
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
}

module.exports = new AdminController();
