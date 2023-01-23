const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } =  require('express-validator'); 

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status('500').send('Sever Error');
    }

});

// @route   POST api/auth
// @desc    Authenticate user & get token ( Authentication means we have correct password and username when log in)
// @access  Public
router.post('/', 
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is requried').exists()
], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { email, password } = req.body;

    try {

        // See if user exists
        let user = await User.findOne({ email }); //*in users.js we have to create a user using User class, but here we just grab it from database

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
        }

        // See is password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
        }


        // Return jsonwebtoken if we provide the correct username and password
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 36000000 },
            (err, token) => {
                if(err) throw err;
                res.json( { token });
            }
        );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;