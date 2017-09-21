# postcss-globalize #

If you are using `postcss-modules` this plugin will scope all `@keyframes`, `.classes`, and `#ids` as `global` by  adding `:global()`.

## Useage ##

``` javascript
const fs = require('fs');
const postcss = require('postcss');
const globalize = require('postcss-globalize');

/* styles.css

.class {
  margin:0;
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

:global(.class) {
   margin:0;
}

:global(#id) {
  margin:0;
}

 @keyframes :global(test-keyframe) {}
*/
```