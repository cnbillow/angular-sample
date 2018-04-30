const isProd = process.env.NODE_ENV;
const isAot = process.env.BUILD_AOT;
const isPwa = process.env.BUILD_PWA;

if (isProd) {
    module.exports = require('./config/webpack.config.prod')({env: 'production', isAot, isPwa});
} else {
    module.exports = require('./config/webpack.config.dev')({env: 'development'});
}