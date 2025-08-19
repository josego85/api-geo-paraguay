const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const DotenvWebpackPlugin = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  entry: './server.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'app/i18n', to: 'i18n' },
        { from: 'docs', to: 'docs' },
      ],
    }),
  ],
  devtool: 'source-map',
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
