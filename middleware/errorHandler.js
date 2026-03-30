const createError = require('http-errors');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    // Set locals, only providing error in development
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        status,
        message,
        // Stack trace only in development
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

// 404 handler middleware
const notFoundHandler = (req, res, next) => {
    next(createError(404, 'The requested resource was not found'));
};

module.exports = { errorHandler, notFoundHandler };
