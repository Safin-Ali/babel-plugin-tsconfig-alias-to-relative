const jsonParse = require('json-to-js-obj');
const { resolve, basename, } = require('node:path');
const { readFileSync } = require('node:fs');
const logger = require('./color-logger');

const rootDir = resolve(basename(__dirname), '..');
const tsConfFile = (() => {
	try {
		return readFileSync(resolve(rootDir, 'tsconfig.json'), 'utf-8')
	}
	catch {
		logger.error('tsconfig.json missing in root directory');
		throw new Error('tsconfig.json missing');
	}
})();

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