const Employee = require('../models/Employee');

const allowedFields = [
    'first_name',
    'last_name',
    'email',
    'position',
    'salary',
    'date_of_joining',
    'department'
];

const filterFields = (data) => {
    const filtered = {};

    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            filtered[field] = data[field];
        }
    }

    return filtered;
};

exports.createEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create({
            ...filterFields(req.body),
            user: req.user.id
        });

        res.status(201).json({
            message: 'Employee created successfully',
            employee
        });
    } catch (error) {
        next(error);
    }
};

exports.getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find({
            user: req.user.id
        });

        res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
};

exports.getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json(employee);
    } catch (error) {
        next(error);
    }
};

exports.updateEmployee = async (req, res, next) => {
    try {
        const updates = filterFields(req.body);

        const employee = await Employee.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            { $set: updates },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Employee updated successfully',
            employee
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findOneAndDelete({
            _id: req.query.eid,
            user: req.user.id
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};