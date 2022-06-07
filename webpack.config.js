const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        // eslint-disable-next-line no-undef
        index: path.resolve(__dirname, "./src/scripts/pages/index.js"),
        // eslint-disable-next-line no-undef
        photographer: path.resolve(__dirname, "./src/scripts/pages/photographer.js"),
    },
    output: {
        filename: "[name].bundle.js",
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "./dist/js"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [new ESLintPlugin()]
};
