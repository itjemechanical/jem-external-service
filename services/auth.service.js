const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.post('/login', async (req, res) => {
    try {
        const { user, password } = req.body;
        const user_target = await User.findOne({ where: { user } });
        
        if (!user_target || !user_target.validatePassword(password)) {
            return res.status(401).json({ error: 'Invalid user/email or password' });
        }
        const token = user_target.generateAuthToken();
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/login', async (req, res) => {
    res.render('login');
});
  

module.exports = router;
