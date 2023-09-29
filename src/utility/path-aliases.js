const { parse,sep } = require('node:path');

const { ts_alias, rootDir } = require('./tsconf-path-alias');

const logger = require('./color-logger');

const symbolSTReg = /^[~@]/;

/**
 *
 * @param {String} alias - The alias to be checked.
 * @param {Object} tsAlias - he TypeScript alias object to be searched.
 * @returns {boolean} Returns `true` if the alias exists in the tsAlias object, otherwise `false`.
 */

const aliasExist = (alias,tsAlias) => {
	const symbolCheck = symbolSTReg.test(alias);
	const aliasOnly = alias.split('/')[0];
	if(!symbolCheck) return false;
	if(tsAlias.hasOwnProperty(aliasOnly+'/*') || tsAlias.hasOwnProperty(aliasOnly)) return true;
	return false;
};

/**
 * Resolves TypeScript path aliases in import declarations.
 * @function
 * @returns {Object} - An object containing a `visitor` property
 * @property {Object} visitor - An object with an `ImportDeclaration` property.
 * @param {Object} path - The AST path node.
 * @param {Object} state - The state object.
 * @param {String} state.filename - The current filename.
 * @throws {Error} - Throws an error if `node:path`, `tsconf-path-alias`, or `color-logger` modules are not found.
*/

module.exports = function () {
	const result = {
		visitor: {
			ImportDeclaration(path, state) {
				const rawVal = path.node.source.value;
				const valState = state.filename;
				if(!aliasExist(rawVal,ts_alias)) return;
				let fixedAlias = false;
				const { dir } = parse(valState);
				const firstSegAlias = rawVal.split('/');
				let tsAlias = ts_alias[firstSegAlias[0] + "/*"];
				const aliasLevel = dir.replace(rootDir + '\\', '').split(sep);
				if (!tsAlias) {
					tsAlias = ts_alias[firstSegAlias[0]];
					fixedAlias = true;
				}
				tsAlias.forEach(als => {
					let actualPath = '';
					aliasLevel.forEach(() => {
						actualPath = actualPath.concat('../');
					});
					if (fixedAlias) {
						const rmvSymbol = firstSegAlias.slice(-1)[0].replace(symbolSTReg, "")
						als = actualPath.concat(als.replace(/\/[^\/]+\.ts$/, "/" + rmvSymbol));
						fixedAlias = false;
					} else {
						als = actualPath.concat(als.replace(/\/[^\/]+\.ts$/, "/" + firstSegAlias.slice(-1)[0]));
					}

					if (als.split('../').length <= 2) {
						als = als.replace('../', "./");
						als = als.replace(".ts",".js");
					} else {
						als = als.replace('../', "");
						als = als.replace(".ts",".js");
					}
					path.node.source.value = als;
				});
			},
		}
	};
	logger.success('tsconfig path alias resolved successfully')
	return result;
};