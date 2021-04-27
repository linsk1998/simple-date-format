import node from "@rollup/plugin-node-resolve";
import importResolve from "rollup-plugin-import";
export default {
	input:"index.js",
	output:[{
		file:"dist/simple-date-format.js",
		name:"SimpleDateFormat",
		format:"umd"
	},{
		file:"dist/simple-date-format.mjs",
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