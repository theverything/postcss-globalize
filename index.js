const postcss = require('postcss');

const globalRegex = new RegExp(/(\.|#)[a-z-_]+/, 'gi');

module.exports = postcss.plugin('postcss-globalize', () => css => {
  css.walkRules(rule => {
    let hasAnimationDecl = false;

    rule.walkDecls(/^animation(-name)?$/, () => {
      hasAnimationDecl = true;
    });

    // eslint-disable-next-line no-param-reassign
    rule.selector = rule.selectors
      .map(selector => {
        const hasClassOrID = selector.match(globalRegex);
        let s = hasClassOrID ? `:global(${selector})` : selector;
        s = hasAnimationDecl ? `${s} :global` : s;

        return s;
      })
      .join(', ');
  });

  css.walkAtRules(/keyframes/, rule => {
    // eslint-disable-next-line no-param-reassign
    rule.params = `:global(${rule.params})`;
  });
});
