const path = require(`path`);

const webpack = require(`webpack`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const ExtractTextPlugin = require(`extract-text-webpack-plugin`);
const usl = require(`uglify-save-license`);

const env = process.env.NODE_ENV;
const extractCSS = new ExtractTextPlugin(`./css/[name].css`);

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(env),
      BROWSER: JSON.stringify(true),
    },
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `src/html/index.pug`),
  }),
  extractCSS,
];

if (env === `production`) {
  plugins.push(...[
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: true,
      comments: usl,
    }),
  ]);
}


module.exports = {
  entry: {
    index: path.resolve(__dirname, `src/js/index.jsx`),
  },
  output: {
    filename: `js/[name].js`,
    path: path.resolve(__dirname, `docs`),
  },
  resolve: {
    modules: [
      path.join(__dirname, `src/js`),
      `node_modules`,
    ],
    extensions: [`.js`, `.jsx`, `.json`],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: `pre`,
        use: { loader: `eslint-loader` },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: `babel-loader` },
      },
      {
        test: /\.pcss$/,
        use: extractCSS.extract([`css-loader`, `postcss-loader`]),
      },
      {
        test: /\.pug$/,
        use: { loader: `pug-loader` },
      },
      {
        test: /\.yml$/,
        use: [`json-loader`, `yaml-loader`],
      },
    ],
  },
  devtool: env === `production` ? false : `source-map`,
  plugins,
  devServer: {
    contentBase: `docs`,
    compress: false,
    port: 9000,
  },
};
