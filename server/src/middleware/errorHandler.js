/**
 * Global Express Error Handling Middleware
 * Ensures sanitized response output without exposing internal stack traces in production
 */
function errorHandler(err, req, res, next) {
  console.error('🔥 Server Error:', err);

  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || 'An internal server error occurred.',
    ...(isProduction ? {} : { stack: err.stack })
  });
}

module.exports = errorHandler;
