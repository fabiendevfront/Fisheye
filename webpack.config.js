const path = require("path");

module.exports = {
    entry: path.resolve("./src/scripts/app.js"),
    watch: true,
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve("./dist/js"),
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
};
