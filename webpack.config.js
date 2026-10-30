const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: { filename: '[name].[contenthash].js', publicPath: '/' },
  plugins: [new HtmlWebpackPlugin({ title: 'Disponibilidad de menús | Casino USM' })],
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-react'] }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: { port: 5050, hot: false, historyApiFallback: true }
}
