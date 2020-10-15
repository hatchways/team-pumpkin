const jwt = require("jsonwebtoken");

module.exports = function (payload, secret, expireIn, res, userObject) {
  jwt.sign(payload, secret, { expiresIn: expireIn }, (err, token) => {
    if (err) throw err;
    res.json({ success: true, token, userObject });
  });
};
