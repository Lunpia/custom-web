const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/youtube/js/youtube.com.js"
    },
    output: {
        path: path.join(__dirname, "./dist/"),
        filename: "youtube.com.js"
    }
};