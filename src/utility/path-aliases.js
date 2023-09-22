const {parse, resolve, basename,dirname} = require('node:path');

const jsonParse = require('json-to-js-obj');

const logger = require('./color-logger');

const rootDir = resolve(basename(__dirname),'..');

module.exports = function () {
  return {
	visitor: {
		ImportDeclaration(path,state) {
			const rawval = path.node.source.value;
			const valState = state.filename;
			logger.process(`start`);
			console.log(valState,rawval);
			logger.error(`end`);
		}}
  };
};

