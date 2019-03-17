const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    webpack(config) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        });

        config.resolve.alias['@'] = path.resolve(__dirname, './')
    
        return config;
    }
});