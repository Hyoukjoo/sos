const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const path = require('path');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

module.exports = withCss(withSass({
  distDir: '.next',
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  }
}));