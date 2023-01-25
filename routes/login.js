const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../mongoose/model/User')

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        } 
      
        if(isMatch) {
            return res.status(200).json({status: true, user: user.id});
        }
    } catch (e) {
        console.log(e.message);
    }
});


module.exports = router