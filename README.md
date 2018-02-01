# postcss-globalize

[![Build Status](https://travis-ci.org/theverything/postcss-globalize.svg?branch=master)](https://travis-ci.org/theverything/postcss-globalize)
[![Coverage Status](https://coveralls.io/repos/github/theverything/postcss-globalize/badge.svg?branch=master)](https://coveralls.io/github/theverything/postcss-globalize?branch=master)

If you are using `postcss-modules` this plugin will scope all `@keyframes`, `.classes`, and `#ids` as `global` by adding `:global()`. It will also scope selectors with `animation` or `animation-name` declarations with a `:global` scope.

## Useage

```javascript
const fs = require('fs');
const postcss = require('postcss');
const globalize = require('postcss-globalize');

/* styles.css

.class {
  margin:0;
  animation: test-keyframe 3s;
}

#id {
  margin:0;
}

@keyframes test-keyframe {}
*/

fs.readFile('styles.css', (err, css) => {
    postcss([globalize()])
      .process(css, { from: 'styles.css', to: 'output.css' })
      .then(result => fs.writeFile('output.css', result.css););
});

/* output.css

:global(.class) :global {
   margin:0;
   animation: test-keyframe 3s;
}

:global(#id) {
  margin:0;
}

 @keyframes :global(test-keyframe) {}
*/
```
