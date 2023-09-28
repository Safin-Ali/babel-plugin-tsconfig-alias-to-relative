/**
 * Module for handle `tsconfig,json`, `print status with meaningful color`.
 * @module tsConfFile
 */

const jsonParse = require('json-to-js-obj');
const { resolve, basename, } = require('node:path');
const { readFileSync } = require('node:fs');
const logger = require('./color-logger');

/**
 * The root directory path.
 * @type {string}
 */
const rootDir = resolve(basename(__dirname), '..');

/**
 * Try to read `tsconfig.json`.
 * @function - This is a `IIFE` function.
 * @returns {String} - The JSON will return as `string`
 * @throws {Error} - Throws an error if tsconfig.json is missing.
 */

const tsConfFile = (() => {
	try {
		return readFileSync(resolve(rootDir, 'tsconfig.json'), 'utf-8')
	}
	catch {
		logger.error('tsconfig.json missing in root directory');
		throw new Error('tsconfig.json missing');
	}
})();

/**
 * The TypeScript aliases defined in the tsconfig.json file.
 * @type {Object}
 * @throws {Error} Throws an error if parsing or required properties are missing.
 */
const ts_alias = (() => {
	try {
		return jsonParse(tsConfFile).compilerOptions.paths
	}
	catch (err) {
		logger.error('for debug check points of below \n 1. unnecessary "comma ," in tsconfig.json \n 2. not found paths property in tsconfig.json')
		throw new Error();
	}
})();

module.exports = {
	ts_alias,
	rootDir
};