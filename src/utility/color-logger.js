/**
 * Formats a given message with ANSI escape codes to apply color.
 *
 * @param {string} message - The message to be colorized.
 * @param {number} colorCode - The ANSI color code to apply to the message.
 * @returns {string} The colorized message.
 */
const colorize = (message, colorCode) => `\x1b[${colorCode}m${message}\x1b[0m`;

/**
 * A logger utility that provides methods for logging messages with different colors.
 */
const logger = (function () {
    return {
        /**
         * Logs an error message in red.
         *
         * @param {string} message - The error message to log.
         */
        error: (message) => console.log(colorize(message, 31)),

        /**
         * Logs a process message in blue.
         *
         * @param {string} message - The process message to log.
         */
        process: (message) => console.log(colorize(message, 34)),

        /**
         * Logs a warning message in yellow.
         *
         * @param {string} message - The warning message to log.
         */
        warn: (message) => console.log(colorize(message, 33)),

        /**
         * Logs a success message in green.
         *
         * @param {string} message - The success message to log.
         */
        success: (message) => console.log(colorize(message, 32))
    };
})();

// Export the 'logger' object as the default export of this module.
module.exports = logger;
