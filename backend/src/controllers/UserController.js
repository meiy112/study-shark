// UserController.js
const userService = require('../services/UserService');

class UserController {
  // gets all user's information
  getUser(req, res) {
    userService.getUser(req.username)
    .then (rows => {
      res.send(rows);
    })
    .catch (err => {
      if (err.message == 'No username') {
        if (req.expired == 'true') {
          // return "Bad Request" if user was not authenticated because jwt expired
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access user info, jwt expired'});
        } else {
          // return "Bad Request" if user was not authenticated
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access user info'});
        }
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getUser'});
      }
      return;
    });
  }

  // gets all user's information
  putUserEmail(req, res) {
    userService.putUserEmail(req.username, req.body.email)
    .then (rows => {
      const arrays = rows.filter(element => Array.isArray(element));
      res.send(arrays[0]);
    })
    .catch (err => {
      if (err.message == 'No username') {
        if (req.expired == 'true') {
          // return "Bad Request" if user was not authenticated because jwt expired
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access user info, jwt expired'});
        } else {
          // return "Bad Request" if user was not authenticated
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access user info'});
        }
      } else if (err.message == 'This email already exists') {
        // return "Bad Request" if email already exists
        res.status(400).send({message: 'Bad Request', 
                              details: 'email already exists'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getUser'});
      }
      return;
    });
  }

  // gets all user's information
  putUserSchool(req, res) {
    userService.putUserSchool(req.username, req.body.school)
    .then (rows => {
      const arrays = rows.filter(element => Array.isArray(element));
      res.send(arrays[0]);
    })
    .catch (err => {
      if (err.message == 'No username') {
        if (req.expired == 'true') {
          // return "Bad Request" if user was not authenticated because jwt expired
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access user info, jwt expired'});
        } else {
          // return "Bad Request" if user was not authenticated
          res.status(400).send({message: 'Bad Request', 
                                  details: 'unidentified user tried to access user info'});
        }
      } else if (err.message == 'This school does not exist') {
        // return "Bad Request" if school does not exist
        res.status(400).send({message: 'Bad Request', 
                              details: 'school does not exist'});
      } else {
        // return 'Internal Service Error' if anything strange happens in the query 
        res.status(500).send({message: 'Internal Service Error', 
                              details: 'Error executing query: getUser'});
      }
      return;
    });
  }
}

module.exports = new UserController();
