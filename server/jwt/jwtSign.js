const jwt = require('jsonwebtoken');

module.exports = function (payload, secret, expireIn, res, userObject) {
  jwt.sign(payload, secret, { expiresIn: expireIn }, (err, token) => {
    if (err) throw err;
    //Store the token in cookie
    res.cookie('auth-token', token);
    res.json({ success: true, userObject });
  });
};
