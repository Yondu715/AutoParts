const path = require("path");

module.exports = {
	entry: {
		app: "./src/start.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist"
	},
	devServer: {
		port: 1337,
		static: {
			directory: path.join(__dirname)
		},
		client: {
			overlay: true
		}
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			loader: "babel-loader",
			exclude: "/node_modules/"
		},
		{
			test: /\.css$/,
			use: ["style-loader", "css-loader"],
			exclude: "/node_modules/"
		}
	]
	},
	experiments: {
		topLevelAwait: true
	}

}