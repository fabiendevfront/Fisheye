const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve("./src/scripts/app.js"),
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "./dist/js"),
        filename: "bundle.js",
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
