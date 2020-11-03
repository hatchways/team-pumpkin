const express = require('express');
const router = express.Router();
const User = require('../../models/User');

//@route            POST /api/user/:user_id
//@desc             Get a user by id
//@access           public
router.get('/user/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) return res.status(400).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
