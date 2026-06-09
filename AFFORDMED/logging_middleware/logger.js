/**
 * logging_middleware/logger.js
 *
 * Express middleware that logs every incoming HTTP request.
 * Logs: timestamp, method, URL, status code, and response time.
 *
 * Usage:
 *   const logger = require('../../logging_middleware/logger');
 *   app.use(logger);
 */

function logger(req, res, next) {
  const start = Date.now();

  // Capture response finish event to log the final status code
  res.on("finish", () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
  });

  next();
}

module.exports = logger;
