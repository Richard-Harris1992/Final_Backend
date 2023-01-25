const express = require('express');
const router = express.Router();
const User = require('../mongoose/model/User')
const Profile = require('../mongoose/model/Profile')


router.get('/dashboard/:id', async (req, res) => {
    
    try {
        const profile = await Profile.findOne({ user: req.params.id });
        const user = await User.findById(req.params.id);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        console.log(profile)
        return res.status(200).json({ prof: profile, use: user});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});





router.post('/create-profile', async (req, res) => {
    const { name, bio, location, status, gender, age, avatar, email } = req.body;
   
    let user = await User.findOne({ email });
    
    if (user) {
        try {
            let profile = await Profile.findOne({ email });
            
            if (profile) {
                return res.status(400).json({ errors: [{ msg: 'User profile has already been made.' }] });
            } 

            profile = new Profile({
                user: user._id,
                name,
                bio,
                location,
                status,
                gender,
                age,
                avatar,
            });

            await profile.save();

            console.log(profile);
            console.log('success');
            return res.json();

        } catch (e) {
            console.log(e.message);
        }
    }
});



module.exports = router;