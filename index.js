const postcss = require('postcss');

const globalRegex = new RegExp(/(\.|#)[a-z-_]+/, 'gi');

module.exports = postcss.plugin('postcss-globalize', function(opts) {
  opts = opts || {};

  return function(css, result) {
    css.walkRules(rule => {
      rule.selector = rule.selectors
        .map(selector => {
          const hasClassOrID = selector.match(globalRegex);
          const s = hasClassOrID ? `:global(${selector})` : selector;

          return s;
        })
        .join(', ');
    });
  };
});
