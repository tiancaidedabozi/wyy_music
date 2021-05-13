const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

    mode: 'development',

    entry: path.join(__dirname, './src/main.js'),

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new vueLoaderPlugin()
    ],

    module: {
        rules: [
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(jpg|jpeg|png|gif|ttf|woff|svg|eot|woff2)$/, use: 'url-loader?limit=9129&name=[hash:8]-[name].[ext]&esModule=false' },
        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, './src')
        }
    },
    devServer: { disableHostCheck: true, }
}