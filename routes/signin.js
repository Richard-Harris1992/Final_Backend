const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../mongoose/model/User')

router.post('/signup', async (req, res) => {
  
   const { name, email, password } = req.body;
   try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save()
    } catch (e) {
        console.log(e.message);
    }
    });

    module.exports = router;