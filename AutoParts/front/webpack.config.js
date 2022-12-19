const path = require("path");

module.exports = {
	entry: {
		app: "./src/script/start.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist"
	},
	devServer: {
		port: 8081,
		static: {
			directory: path.join(__dirname, "src")
		},
		client: {
			overlay: true,
			progress: true,
			reconnect: 5
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