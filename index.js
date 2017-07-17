const postcss = require('postcss');

function globalize(selector) {
  const s = selector.trim();
  const char = s.trim().charAt(0);
  return char === '.' || char === '#' ? `{{GLOBAL}}${s.trim()}` : s.trim();
}

module.exports = postcss.plugin('postcss-globalize', function(opts) {
  opts = opts || {};

  return function(css, result) {
    css.walkRules(rule => {
      rule.selector = rule.selector
        // handle comma sperated selectors
        .split(',')
        .map(globalize)
        .join(',')
        // handle space sperated selectors
        .split(' ')
        .map(globalize)
        .join(' ')
        // add the `:global` identifier
        .replace(/{{GLOBAL}}/g, ':global ')
        // add spaces after commas
        .split(',')
        .join(', ');
    });
  };
});
