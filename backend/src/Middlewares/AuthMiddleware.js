const db = require('../configs/db');
require('dotenv/config');
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
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
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await findUser(data.id)
            if (user) return res.json({ status: true, user: user.username })
            else return res.json({ status: false })
        }
    })
}