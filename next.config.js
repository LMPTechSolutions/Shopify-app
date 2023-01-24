require("dotenv").config();
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');
const withSass = require('@zeit/next-sass')

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = withCSS(withSass({
  webpack: config => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  }
}));
