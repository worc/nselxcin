const path = require("path");

module.exports = [
    {
        name: "server",
        entry: "./server.js",
        target: "node",
        mode: 'development',

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "server.js"
        },

        // resolve: {
        //     modules: ['shared', 'node_modules']
        // },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                }
            ]
        },
    }, {
        name: 'client',
        entry: './client.js',
        mode: 'development',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'client.js',
        },

        // resolve: {
        //     modules: ['shared', 'node_modules']
        // },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    }
];