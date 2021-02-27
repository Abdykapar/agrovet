const express = require('express');
const router = express.Router();
const User = require('./models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Get all
router.post('/login', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username });
        if(!user) {
            const error = new Error('A user with this username could not be found');
            error.statusCode = 401;
            next(error);
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            next(error);
        }
        const token = jwt.sign({ username: user.username, userId: user._id.toString() },
            'superpupersecretword', { expiresIn: '2h' });

        res.status(200).json(
            {
                token: token,
                user: {
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    id: user._id
                }
            });
    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = 500;
        }
        next(e);
    }
});

//Create
router.post('/register', async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            next(error)
        }
        const username = req.body.username;
        const name = req.body.name;
        const password = req.body.password;
        const hashPw = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            password: hashPw,
            name: name,
            surname: name,
        });
        const newUser = await user.save();
        res.status(201).json({ message: 'User created!', newUser });
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = 500;
        }
        next(e);
    }

});

module.exports = router;
