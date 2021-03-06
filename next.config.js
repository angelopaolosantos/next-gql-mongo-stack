
const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");

const config = {
  // all your options here
  lessLoaderOptions: {
    javascriptEnabled: true
  }
};

module.exports = withPlugins([withCSS, withSass, withLess], config);