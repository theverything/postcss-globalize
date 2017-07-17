const postcss = require('postcss');
const globalize = require('./');

const input =
  '' +
  `body {margin:0;}
body .class, .foo {margin:0;}
.class {margin:0;}
#id {margin:0;}
.list, .of, .classes, .and, .an, #id {margin:0;}
h1, div a ul ,.foo,span .bazz   .hello-world,   #bar     ,   div code {margin:0;}
.col-9, .col-10, .Component__foo {margin:0;}`;

const output =
  '' +
  `body {margin:0;}
body :global .class, :global .foo {margin:0;}
:global .class {margin:0;}
:global #id {margin:0;}
:global .list, :global .of, :global .classes, :global .and, :global .an, :global #id {margin:0;}
h1, div a ul ,:global .foo,span :global .bazz   :global .hello-world,   :global #bar     ,   div code {margin:0;}
:global .col-9, :global .col-10, :global .Component__foo {margin:0;}`;

test('adds `:global` to classes and ids', function() {
  return postcss([globalize()]).process(input).then(function(result) {
    expect(result.css).toEqual(output);
  });
});
