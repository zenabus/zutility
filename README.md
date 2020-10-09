
<h1 align="center">Zutility.js</h1>

<p align="center">A simple and light-weight JavaScript-based CSS utility library.</p>
<p align="center">
  <img src="https://img.shields.io/badge/js%20minified-5.43kb-green" />
  <img src="https://img.shields.io/badge/js-10.6kb-blue" />
</p>

## Usage
Import the JavaScript file to your project: 
````html
<script src="zutility.js"></script>
````

Syntax:
````html
<element class="property:value"></element>
````
Properties with variable value:
````html
<div class="p:16px"></div> // padding: 16px;
````
Properties with constant value:
````html
<div class="p:a"></div> // position: absolute;
````
## List of classes

#### Properties with variable value:
Zutility Property | CSS Equivalent
--- | ---
p | padding
pt | padding-top
pr | padding-right
pb | padding-bottom
pl | padding-left
py | padding-block
px | padding-inline
m | margin
mt | margin-top
mr | margin-right
mb | margin-bottom
ml | margin-left
my | margin-block
mx | margin-inline
w | width
w- | min-width
w+ | max-width
h | height
h- | min-height
h+ | max-height
t | top
l | left
b | bottom
r | right
bc | border-color
bg | background
br | border-radius
c | color
ti | text-indent
f | flex
fb | flex-basis
fg | flex-grow
fsh | flex-shrink
ff | font-family
fs | font-size
fw | font-weight
ls | letter-spacing
lh | line-height
o | opacity
ws | word-spacing
zi | z-index

#### Properties with variable value:
Zutility Property | CSS Equivalent
--- | ---
ac | align-content
ai | align-items
as | align-self
b | border
bt | border-top
br | border-right
bb | border-bottom
bl | border-left
bo | box-sizing
c | cursor
cf | clear
d | display
f | float
fd | flex-direction
fw | flex-wrap
jc | justify-content
lst | list-style-type
o | outline
of | overflow
ofx | overflow-x
ofy | overflow-y
p | position
ta | text-align
td | text-decoration
tt | text-transform
v | visibility
va | vertical-align
wb | word-break
ws | white-space
ww | word-wrap

#### Note:
Use ini for initial and inh for inherit values.
## Demo

[Live demo at CodePen.io](https://codepen.io/zenabus/pen/) [in progress]

## Changelog
### v1.2.0 - 2020-10-10:
- optimized code readability.

### v1.1.2 - 2020-10-09:
 - added polyfill for insertRule function.

### v1.1.1 - 2020-10-09:
- removed duplicate CSS classes.

### v1.1.0 - 2020-10-09:
- changed the generated CSS class names.
- added new CSS properties to zutility.js.
- removed unnecessary codes.

### v1.0.0 - 2020-06-10:
- initial commit

## Thanks

- [GitHub](https://github.com/zenabus)
- [LinkedIn](https://linkedin.com/in/zenabus)
- [FreeCodeCamp](https://freecodecamp.org/zenabus)
- [CodePen](https://codepen.io/zenabus)
- [Buy Me a Coffee](https://www.buymeacoffee.com/zenabus)
