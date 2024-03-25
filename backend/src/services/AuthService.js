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

    const checkReputationDoesNotExist = () => {
        return new Promise((resolve, reject) => {
            const exists = "SELECT reputation FROM reputation WHERE reputation = ?"; 
            db.query(exists, ["-10x Engineer"], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.length == 0);
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
        // Check if default reputation already exists 
        if (await checkReputationDoesNotExist()) {
            await new Promise((resolve, reject) => {
                const newRep = "INSERT INTO `Reputation` (`reputation`, `borderColor`) VALUES ('-10x Engineer', 'red')";
                db.query(newRep, (err, rows, fields) => {
                    if (err) {
                        reject(err);
                        return; 
                    }
                    resolve();
                });
            })
        }
        const hashed_password = await bcrypt.hash(password, 12);
        console.log(hashed_password);
        // Add User 
        // Get current date and time in PST
        const currentDate = new Date();
        const pstOffset = -8 * 60; // Pacific Standard Time (PST) is UTC-8
        const pstDate = new Date(currentDate.getTime() + pstOffset * 60000);

        // Format date in MySQL date format (YYYY-MM-DD HH:MM:SS)
        const formattedDate = pstDate.toISOString().slice(0, 19).replace('T', ' ');
        const query = "INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const newUser = await new Promise((resolve, reject) => {
            db.query(query, [username, null, '-10x Engineer', hashed_password, null, 0, formattedDate], (err, rows, fields) => {
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
            const error = new Error('Incorrect password or username');
            error.statusCode = 402; 
            throw error; 
        }
        const auth = await bcrypt.compare(password,user[0].password)
        //console.log(auth);
        if (!auth) {
            // Password is wrong, return an error message
            const error = new Error('Incorrect password or username');
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