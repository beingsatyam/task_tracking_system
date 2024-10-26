const express = require('express');
const { check, validationResult } = require('express-validator');


const { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { validUser } = require('../middlewares/validate.middleware');

const router = express.Router();


router.post('/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    next();
    },
    registerUser
);


router.post('/login', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }

    next();

    },
    loginUser
);

router.post('/logout', logoutUser);
router.get('/profile', validUser, getUserProfile);
router.put('/profile', validUser, updateUserProfile);


module.exports = router;
