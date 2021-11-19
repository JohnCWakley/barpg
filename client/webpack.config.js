const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: process.env.NODE_ENV !== 'production' ? 'eval-cheap-source-map' : false,
    mode: process.env.NODE_ENV ?? 'production',
    module: {},
    resolve: {
        extensions: ['.js'],
    },
    plugins: [],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    }
};