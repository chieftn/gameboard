const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
    const configuration = {
        devServer: {
            historyApiFallback: true,
            compress: true,
            port: 3000,
        },
        devtool: 'inline-source-map',
        entry: './src/index.ts',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '.', 'dist'),
            publicPath: '/',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    };

    return configuration;
};
