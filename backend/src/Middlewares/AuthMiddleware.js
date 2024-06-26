const db = require('../configs/db');
require('dotenv/config');
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
    const findUser = (username) => {
        return new Promise((resolve, reject) => {
            const exists = 'SELECT username FROM User WHERE username = ?'; 
            db.query(exists, [username], (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows[0]);
            });
        });
    };

    const authHeader = req.headers['authorization'];
    let token;

    if (!authHeader) {
        req.username = "no user"; 
        token = "";
    } else {
      let tokenParts = authHeader.split(' ');
      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid Authorization header format' });
      }
      token = tokenParts[1];
    }


    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            if (err.message == 'jwt expired') {
                req.expired = "true";
            } else {
                req.expired = "false";
            }
            req.username = "no user";
            next(); 
        } else {
            const user = await findUser(data.id)
            if (user) {
                req.username = user.username;
                req.expired = "false";
            } 
            else {
                req.username = "no user"; 
                req.expired = "false";
            }
            //if (user) return res.json({ status: true, user: user.username })
            //else return res.json({ status: false })
            next(); 
        }
    })
}