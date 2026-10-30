const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: { filename: '[name].[contenthash].js', publicPath: '/', clean: true },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CopyPlugin({
      patterns: [{ from: 'public', globOptions: { ignore: ['**/index.html'] } }]
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript'
          ]
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
    ]
  },
  devServer: { port: 5050, hot: false, historyApiFallback: true }
}
