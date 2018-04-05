const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
  devServer: {
    publicPath: '/',
    contentBase: [
      __dirname,
      path.join(__dirname, 'dist'),
    ],
  },
};
