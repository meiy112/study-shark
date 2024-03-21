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
    const token = req.headers['authorization'];
    if (!token) {
        req.username = "no user"; 
    }
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