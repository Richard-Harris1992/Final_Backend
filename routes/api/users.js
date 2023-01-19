const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator/check');
const User = require('../../mongoose/model/User');

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', "Please enter a valid email").isEmail(),
    check('password', 'Please enter a valid password with more than 4 characters').isLength({ min: 4})     
], async (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() });
    }
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        
        if(user) {
            res.status(400).json( { msg: 'User exists already' });
        }

        //having difficulty here, maybe delete 
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        res.send('User Route')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

    


module.exports = router;