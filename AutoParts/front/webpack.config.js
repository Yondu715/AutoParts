const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	plugins: [new MiniCssExtractPlugin({
		filename: "bundle.css",
		chunkFilename: "[id].css"
	})],
	entry: {
		app: "./src/script/start.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist"
	},
	devServer: {
		port: 8081,
		static: {
			directory: path.join(__dirname)
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
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			},
			exclude: "/node_modules/"
		},
		{
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, "css-loader"],
			exclude: "/node_modules/"
		}
	]
	},
	experiments: {
		topLevelAwait: true
	}

}