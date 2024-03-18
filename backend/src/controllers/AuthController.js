// AuthController.js
const authService = require('../services/AuthService');

class AuthController {
  authSignUp(req, res) {
    authService.authSignUp(req)
        .then(({rows, token}) => {
            // res.cookie("token", token, {
            //     withCredentials: true, 
            //     httpOnly: false,
            // });
            res.status(201).json({ message: "User signed in successfully", success: true, rows, token});
        })
        .catch(err => {
            if (err.message == 'User already exists') {
                res.json({ message: "User already exists" });
                return;
            }
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        });
  }

  authLogin(req, res) {
    authService.authLogin(req) 
        .then((token) => {
            // res.cookie("token", token, {
            //     withCredentials: true, 
            //     httpOnly: false,
            // });
            res.status(202).json({ message: "User logged in successfully", success: true, token});
        })
        .catch(err => {
            if (err.message == 'All fields are required') {
                res.json({ message: "All fields are required" });
                return;
            } else if (err.message == 'Incorrect password or email') {
                res.json({ message: "Incorrect password or email" });
                return; 
            }
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        });
  }
}

module.exports = new AuthController();
