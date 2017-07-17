const postcss = require('postcss');

const regex = new RegExp(/([.#][a-z0-9_-]+)(\s*,\s*|\s+)?/, 'gi');

function globalize(_, selector, separator = '') {
  const char = selector.charAt(0);
  const newSelector = char === '.' || char === '#' ? `:global ${selector}` : selector;
  return `${newSelector}${separator}`;
}

module.exports = postcss.plugin('postcss-globalize', function(opts) {
  opts = opts || {};

  return function(css, result) {
    css.walkRules(rule => {
      rule.selector = rule.selector.replace(regex, globalize);
    });
  };
});
