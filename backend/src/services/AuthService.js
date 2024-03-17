// achievementLevelService.js
const db = require('../configs/db');
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

class AuthService {

  async authSignUp(req) {

    const checkUserExists = (username) => {
        return new Promise((resolve, reject) => {
            const exists = 'SELECT username FROM User WHERE username = ?'; 
            db.query(exists, [username], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.length != 0);
            });
        });
    };

    try {
        const { username, password, email } = req.body;
        // Check if user already exists 
        if (await checkUserExists(username)) {
            // User already exists, return an error message
            const error = new Error('User already exists');
            error.statusCode = 400; 
            throw error; 
        }
        const hashed_password = await bcrypt.hash(password, 12);
        // Add User 
        const query = "INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`) VALUES (?, ?, ?, ?, ?, ?)";
        const newUser = await new Promise((resolve, reject) => {
            db.query(query, [username, 'UBC', '-10x Engineer', hashed_password, email, 0], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return; 
                }
                resolve(rows);
            });
        })
        const token = createSecretToken(username);
        return {rows: newUser, token};
    } catch (error) {
        throw error; 
    }
  }

  async authLogin(req) {

    const findUser = (username) => {
        return new Promise((resolve, reject) => {
            const exists = 'SELECT username, password FROM User WHERE username = ?'; 
            db.query(exists, [username], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                //console.log(rows);
                //console.log(rows.password);
                resolve(rows);
            });
        });
    };

    try {
        const { username, password } = req.body;
        if(!username || !password ){
            const error = new Error('All fields are required');
            error.statusCode = 401; 
            throw error; 
        }
        // Find User
        const user = await findUser(username); 
        if (user.length == 0) {
            // User doesn't exists, return an error message
            const error = new Error('Incorrect password or email');
            error.statusCode = 402; 
            throw error; 
        }
        const auth = await bcrypt.compare(password,user[0].password)
        if (!auth) {
            // Password is wrong, return an error message
            const error = new Error('Incorrect password or email');
            error.statusCode = 402; 
            throw error; 
        }
        const token = createSecretToken(username);
        return token;
    } catch (error) {
        throw error; 
    }
  }
}

module.exports = new AuthService();