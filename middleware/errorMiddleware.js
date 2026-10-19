const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid resource ID'
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: 'Duplicate value detected'
        });
    }

    res.status(500).json({
        message: 'Internal server error'
    });
};

module.exports = errorHandler;