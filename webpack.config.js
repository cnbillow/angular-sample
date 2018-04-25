const isProd = process.env.NODE_ENV;
const isAot = process.env.BUILD_AOT;

if (isProd) {
    module.exports = require('./config/webpack.config.prod')({env: 'production', isAot});
} else {
    module.exports = require('./config/webpack.config.dev')({env: 'development'});
}