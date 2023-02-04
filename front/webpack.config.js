const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		main: "./src/script/start.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist",
		clean: true
	},

	devServer: {
		port: 8081,
		static: {
			directory: path.join(__dirname, "src")
		},
		client: {
			overlay: true
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
				use: ["css-loader"],
				exclude: "/node_modules/"
			}
		]
	},

	experiments: {
		topLevelAwait: true
	},

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			terserOptions: {
				format: {
					comments: false,
				}
			},
			extractComments: false,
			parallel: true
		})],
	},
}