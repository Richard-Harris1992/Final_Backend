const express = require('express');
const router = express.Router();
const User = require('../mongoose/model/User')
const Profile = require('../mongoose/model/Profile')


router.get('/dashboard/:id', async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.params.id });
        
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        return res.status(200).json({ profile: profile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/dashboard/:id/1', async (req, res) => {
    try {
        const users = await User.find({}, 'name');
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

router.put('/dashboard/:id/edit-profile', async (req, res) => {
    try {
        const { name, bio, location, status, gender, age, avatar } = req.body
        const updatedProfile = await Profile.findOneAndUpdate({ user: req.params.id },
            {
                name,
                bio,
                location,
                status,
                gender,
                age,
                avatar
            }, { new: true });
        res.status(200).json({ success: true, data: updatedProfile });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


router.delete('/dashboard/:id', async (req, res) => {
    try {
        const deleteAccount = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.post('/create-profile', async (req, res) => {
    const { name, bio, location, status, gender, age, avatar, email } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        try {
            let profile = await Profile.findOne({ user: user._id });

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
            return res.status(200).json({ user: user.id })

        } catch (e) {
            console.log(e.message);
        }
    }
});



module.exports = router;

