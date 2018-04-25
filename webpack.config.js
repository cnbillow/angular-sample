const isProd = process.env.NODE_ENV;

if (isProd) {
    module.exports = require('./config/webpack.config.prod')({env: 'production'});
} else {
    module.exports = require('./config/webpack.config.dev')({env: 'development'});
}