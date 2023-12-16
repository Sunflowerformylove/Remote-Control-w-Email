const path = require('path');

module.exports = {
    target: 'node',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'production'
    // externals: {
    //     express: 'commonjs express' // exclude express from being bundled
    // }
};