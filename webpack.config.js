const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { spawn } = require('child_process')


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        stats: {
            colors: true,
            chunks: false,
            children: false
        },
        before() {
            spawn(
                'electron',
                ['.'],
                {shell: true, env: process.env, stdio: 'inherit'}
            )
      //          .on('close', code => process.exit(0))
                .on('error', spawnError => console.error(spawnError))
        }
    },
    entry: ['./src/index.js'],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: `/`
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
}