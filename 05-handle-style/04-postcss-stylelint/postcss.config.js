const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

module.exports = {
    plugins: [
        autoprefixer(),
        stylelint()
    ],
};