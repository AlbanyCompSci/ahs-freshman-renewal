module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: './index.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
