const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    index: path.resolve(__dirname, './server.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  externals: [nodeExternals()],
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'docs'),
          to: path.resolve(__dirname, 'dist/docs'),
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/.DS_Store'],
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      config: path.resolve(__dirname, './app/config'),
      controllers: path.resolve(__dirname, './app/controllers'),
      database: path.resolve(__dirname, './app/database'),
      entities: path.resolve(__dirname, './app/entities'),
      i18n: path.resolve(__dirname, './app/i18n'),
      helpers: path.resolve(__dirname, './app/helpers'),
      middleware: path.resolve(__dirname, './app/middleware'),
      models: path.resolve(__dirname, './app/models'),
      repositories: path.resolve(__dirname, './app/repositories'),
      routes: path.resolve(__dirname, './app/routes'),
      services: path.resolve(__dirname, './app/services'),
    },
    modules: ['node_modules'],
  },
  optimization: {
    minimize: true,
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
