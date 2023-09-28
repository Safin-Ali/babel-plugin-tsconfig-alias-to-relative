const { parse,sep } = require('node:path');

const { ts_alias, rootDir } = require('./tsconf-path-alias');

const logger = require('./color-logger');

module.exports = function () {
	const result = {
		visitor: {
			ImportDeclaration(path, state) {
				const rawVal = path.node.source.value;
				const valState = state.filename;
				let fixedAlias = false;
				if (!rawVal.startsWith('@')) return;
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
						const rmvSymbol = firstSegAlias.slice(-1)[0].replace(/^[~@]/, "")
						als = actualPath.concat(als.replace(/\/[^\/]+\.ts$/, "/" + rmvSymbol));
						fixedAlias = false;
					} else {
						als = actualPath.concat(als.replace(/\/[^\/]+\.ts$/, "/" + firstSegAlias.slice(-1)[0]));
					}

					if (als.split('../').length <= 2) {
						als = als.replace('../src', ".");
					} else {
						als = als.replace('../src/', "");
					}
					path.node.source.value = als;
				});
			}
		}
	};
	logger.success('tsconfig path alias resolved successfully')
	return result;
};

