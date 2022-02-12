const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    entry: {
        index: "./src/index.ts",
        test: "./src/test.ts",
    },
    output: {
        filename: "src/[name].js",
        path: path.resolve(__dirname,"dist"),
        clean: {
            keep: /package.json|README.md/
        },
        libraryTarget: 'umd',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "src/css/[contenthash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /.jpg|.jpeg|.png|.gif/,
                type: "asset/resource"
            },
            {
                test: /.css$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader"]
            },
            {
                test: /.txt/,
                type: "asset/source"
            },
            {
                test: /.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin()
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname,"dist")
        }
    },
    devtool: "inline-source-map",
    mode: "production",
}
