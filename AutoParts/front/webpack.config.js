const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
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
				exclude: "/node_modules/",
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
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
	},
	plugins: [new MiniCssExtractPlugin({
		filename: "bundle.css",
		chunkFilename: "[id].css"
	})]

}