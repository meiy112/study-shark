// AdminController.js
const adminService = require('../services/AdminService');

class AdminController {
  // // gets all user's topics
  // getUserTopics(req, res) {
  //   topicService.getUserTopics(req.username)
  //   .then (rows => {
  //     res.send(rows);
  //   })
  //   .catch (err => {
  //     if (err.message == 'No username') {
  //       if (req.expired == 'true') {
  //         // return "Forbidden" if user was not authenticated because jwt expired
  //         res.status(403).send({message: 'Forbidden', 
  //                                 details: 'unidentified user tried to access topics, jwt expired'});
  //       } else {
  //         // return "Forbidden" if user was not authenticated
  //         res.status(403).send({message: 'Forbidden', 
  //                                 details: 'unidentified user tried to access topics'});
  //       }
  //     } else {
  //       // return 'Internal Service Error' if anything strange happens in the query 
  //       res.status(500).send({message: 'Internal Service Error', 
  //                             details: 'Error executing query: getUserTopics'});
  //     }
  //     return;
  //   });
  // }
}

module.exports = new AdminController();
