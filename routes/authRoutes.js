const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const { register, login } = require('../controllers/authController');

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: 'Too many requests. Please try again later.'
    }
});

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    next();
};

router.post(
    '/signup',
    authLimiter,
    [
        body('username').trim().notEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 })
    ],
    validate,
    register
);

router.post(
    '/login',
    authLimiter,
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty()
    ],
    validate,
    login
);

module.exports = router;