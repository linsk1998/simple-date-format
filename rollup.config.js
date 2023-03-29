import node from "@rollup/plugin-node-resolve";
import importResolve from "rollup-plugin-import";
export default {
	input:"index.js",
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
		node(),
		importResolve({
			libraryName:"sky-core",
			libraryDirectory:"utils"
		})
	]
}