const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const protect = require('../middleware/authMiddleware');

const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

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

const employeeValidation = [
    body('first_name').isString().trim().notEmpty().isLength({ max: 100 }),
    body('last_name').isString().trim().notEmpty().isLength({ max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('position').isString().trim().notEmpty().isLength({ max: 100 }),
    body('salary').isFloat({ min: 0 }),
    body('date_of_joining').isISO8601(),
    body('department').isString().trim().notEmpty().isLength({ max: 100 })
];

const updateValidation = [
    body('first_name').optional().isString().trim().notEmpty().isLength({ max: 100 }),
    body('last_name').optional().isString().trim().notEmpty().isLength({ max: 100 }),
    body('email').optional().isEmail().normalizeEmail(),
    body('position').optional().isString().trim().notEmpty().isLength({ max: 100 }),
    body('salary').optional().isFloat({ min: 0 }),
    body('date_of_joining').optional().isISO8601(),
    body('department').optional().isString().trim().notEmpty().isLength({ max: 100 })
];

const validateId = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid employee ID'
        });
    }

    next();
};

const validateQueryId = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.query.eid)) {
        return res.status(400).json({
            message: 'Invalid employee ID'
        });
    }

    next();
};

router.use(protect);

router.post('/', employeeValidation, validate, createEmployee);
router.get('/', getEmployees);
router.get('/:id', validateId, getEmployeeById);
router.put('/:id', validateId, updateValidation, validate, updateEmployee);
router.delete('/', validateQueryId, deleteEmployee);

module.exports = router;