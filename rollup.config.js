const nodeResolve = require("@rollup/plugin-node-resolve");

module.exports = {
	input:"src/SimpleDateFormat.js",
	output:[{
		file:"dist/simple-date-format.js",
		interop: "esModule",
		esModule: true,
		exports: 'named',
		format:"umd",
		name:"SimpleDateFormat",
		amd: {
			id: 'java.text.simple-date-format'
		}
	},{
		file:"dist/simple-date-format.mjs",
		interop: "esModule",
		esModule: true,
		exports: 'named',
		format:"esm"
	}],
	plugins:[
		nodeResolve()
	]
};
