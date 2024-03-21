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
    if (!token) {
        req.username = "no user"; 
    }
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid Authorization header format' });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            req.username = "no user";
            next(); 
        } else {
            const user = await findUser(data.id)
            if (user) {
                req.username = user.username;
            } 
            else req.username = "no user"; 
            //if (user) return res.json({ status: true, user: user.username })
            //else return res.json({ status: false })
            next(); 
        }
    })
}