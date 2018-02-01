const postcss = require('postcss');
const globalize = require('./');
const modules = require('postcss-modules');

const input = `body {margin:0;}
body .class, .foo {margin:0;}
.class {margin:0;}
#id {margin:0;}
.list, .of, .classes, .and, .an, #id {margin:0;}
h1, div a ul, .foo, span .bazz .hello-world, #bar, div code {margin:0;}
.col-9, .col-10, .Component__foo {margin:0;}
div > .foo {margin:0;}
p + p > .foo ~ .bar + .baz:hover {margin:0;}
.article #comments ul > li > a.button {margin:0;}
.animation-class {animation:3s test-keyframe;animation-name:test-keyframe;}
.class, .foo .animation-class {animation:3s test-keyframe;animation-name:test-keyframe;}
@keyframes test-keyframe {0%{transform:rotate(0deg);}100%{transform:rotate(359deg);}}
@-webkit-keyframes test-keyframe {0%{transform:rotate(0deg);}100%{transform:rotate(359deg);}}
@charset "utf-8"`;

const output = `body {margin:0;}
:global(body .class), :global(.foo) {margin:0;}
:global(.class) {margin:0;}
:global(#id) {margin:0;}
:global(.list), :global(.of), :global(.classes), :global(.and), :global(.an), :global(#id) {margin:0;}
h1, div a ul, :global(.foo), :global(span .bazz .hello-world), :global(#bar), div code {margin:0;}
:global(.col-9), :global(.col-10), :global(.Component__foo) {margin:0;}
:global(div > .foo) {margin:0;}
:global(p + p > .foo ~ .bar + .baz:hover) {margin:0;}
:global(.article #comments ul > li > a.button) {margin:0;}
:global(.animation-class) :global {animation:3s test-keyframe;animation-name:test-keyframe;}
:global(.class) :global, :global(.foo .animation-class) :global {animation:3s test-keyframe;animation-name:test-keyframe;}
@keyframes :global(test-keyframe) {0%{transform:rotate(0deg);}100%{transform:rotate(359deg);}}
@-webkit-keyframes :global(test-keyframe) {0%{transform:rotate(0deg);}100%{transform:rotate(359deg);}}
@charset "utf-8"`;

describe('postcss-globalize', () => {
  let globalizeResult;

  test('adds `:global` scope to classes, ids, keyframes, and declarations with `animation` or `animation-name`', () =>
    postcss([globalize()])
      .process(input, { from: undefined })
      .then(r => {
        expect(r.css).toEqual(output);
        globalizeResult = r;
      }));

  test('parses correctly with css modules', () =>
    postcss([modules({ getJSON() {} })])
      .process(globalizeResult, { from: undefined })
      .then(r => {
        expect(r.css).toEqual(input);
      }));
});
