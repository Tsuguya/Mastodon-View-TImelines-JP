/* eslint global-require: "off" */
module.exports = {
  plugins: [
    require(`postcss-import`)(),
    require(`postcss-nested`)(),
    require(`postcss-merge-idents`)(),
    require(`cssnano`)(),
    require(`postcss-cssnext`)(),
  ],
};
