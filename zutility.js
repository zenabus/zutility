/*!
 * Zutility v1.3.1
 *
 * https://github.com/zenabus
 *
 * Copyright (c) 2020 Francisco Ibañez III
 * Free to use under the MIT license.
 */

document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  // insertRule Polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule#Polyfill
  (function (Sheet_proto) {
    var originalInsertRule = Sheet_proto.insertRule;

    if (originalInsertRule.length === 2) { // 2 mandatory arguments: (selector, rules)
      Sheet_proto.insertRule = function (selectorAndRule) {
        // First, separate the selector from the rule
        a: for (var i = 0, Len = selectorAndRule.length, isEscaped = 0, newCharCode = 0; i !== Len; ++i) {
          newCharCode = selectorAndRule.charCodeAt(i);
          if (!isEscaped && (newCharCode === 123)) { // 123 = "{".charCodeAt(0)
            // Secondly, find the last closing bracket
            var openBracketPos = i,
              closeBracketPos = -1;

            for (; i !== Len; ++i) {
              newCharCode = selectorAndRule.charCodeAt(i);
              if (!isEscaped && (newCharCode === 125)) { // 125 = "}".charCodeAt(0)
                closeBracketPos = i;
              }
              isEscaped ^= newCharCode === 92 ? 1 : isEscaped; // 92 = "\\".charCodeAt(0)
            }

            if (closeBracketPos === -1) break a; // No closing bracket was found!
            /*else*/
            return originalInsertRule.call(
              this, // the sheet to be changed
              selectorAndRule.substring(0, openBracketPos), // The selector
              selectorAndRule.substring(closeBracketPos), // The rule
              arguments[3] // The insert index
            );
          }

          // Works by if the char code is a backslash, then isEscaped
          // gets flipped (XOR-ed by 1), and if it is not a backslash
          // then isEscaped gets XORed by itself, zeroing it
          isEscaped ^= newCharCode === 92 ? 1 : isEscaped; // 92 = "\\".charCodeAt(0)
        }
        // Else, there is no unescaped bracket
        return originalInsertRule.call(this, selectorAndRule, "", arguments[2]);
      };
    }
  })(CSSStyleSheet.prototype);

  const VARIABLE_PROPS = {
    p: 'padding',
    pt: 'padding-top',
    pr: 'padding-right',
    pb: 'padding-bottom',
    pl: 'padding-left',
    py: 'padding-block',
    px: 'padding-inline',
    m: 'margin',
    mt: 'margin-top',
    mr: 'margin-right',
    mb: 'margin-bottom',
    ml: 'margin-left',
    my: 'margin-block',
    mx: 'margin-inline',
    w: 'width',
    'w-': 'min-width',
    'w+': 'max-width',
    h: 'height',
    'h-': 'min-height',
    'h+': 'max-height',
    t: 'top',
    l: 'left',
    b: 'bottom',
    r: 'right',
    bc: 'border-color',
    bg: 'background',
    br: 'border-radius',
    c: 'color',
    ti: 'text-indent',
    f: 'flex',
    fb: 'flex-basis',
    fg: 'flex-grow',
    fsh: 'flex-shrink',
    ff: 'font-family',
    fs: 'font-size',
    fw: 'font-weight',
    ls: 'letter-spacing',
    lh: 'line-height',
    o: 'opacity',
    ws: 'word-spacing',
    zi: 'z-index',
  }

  const BORDER_PROPS = {
    b: 'border',
    bt: 'border-top',
    br: 'border-right',
    bb: 'border-bottom',
    bl: 'border-left'
  }

  const CONSTANT_PROPS = {
    ac: 'align-content',
    ai: 'align-items',
    as: 'align-self',
    bo: 'box-sizing',
    c: 'cursor',
    cf: 'clear',
    d: 'display',
    f: 'float',
    fd: 'flex-direction',
    fw: 'flex-wrap',
    jc: 'justify-content',
    lst: 'list-style-type',
    o: 'outline',
    of: 'overflow',
    ofx: 'overflow-x',
    ofy: 'overflow-y',
    p: 'position',
    ta: 'text-align',
    td: 'text-decoration',
    tt: 'text-transform',
    v: 'visibility',
    va: 'vertical-align',
    wb: 'word-break',
    ws: 'white-space',
    ww: 'word-wrap',
  }

  const CONSTANT_VALS = {
    display: {
      n: 'none',
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      i: 'inline',
      b: 'block',
      c: 'contents',
      f: 'flex',
      g: 'grid',
      ib: 'inline-block',
      if: 'inline-flex',
      ig: 'inline-grid',
      it: 'inline-table',
      li: 'list-item',
      ri: 'run-in',
      t: 'table',
      tc: 'table-caption',
      tcg: 'table-column-group',
      thg: 'table-header-group',
      tfg: 'table-footer-group',
      trg: 'table-row-group',
      tc: 'table-cell',
      tcol: 'table-column',
      trow: 'table-row'
    },
    position: {
      n: 'none',
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      s: 'static',
      a: 'absolute',
      f: 'fixed',
      r: 'relative',
      u: 'unset'
    },
    cursor: {
      a: 'alias',
      as: 'all-scroll',
      auto: 'auto',
      c: 'cell',
      cm: 'context-menu',
      cr: 'col-resize',
      co: 'copy',
      ch: 'crosshair',
      d: 'default',
      er: 'e-resize',
      ewr: 'ew-resize',
      g: 'grab',
      gr: 'grabbing',
      h: 'help',
      m: 'move',
      nr: 'n-resize',
      ner: 'ne-resize',
      neswr: 'nesw-resize',
      nsr: 'ns-resize',
      nwr: 'nw-resize',
      nwser: 'nwse-resize',
      nd: 'no-drop',
      n: 'none',
      na: 'not-allowed',
      p: 'pointer',
      pr: 'progress',
      rowr: 'row-resize',
      sr: 's-resize',
      ser: 'se-resize',
      swr: 'sw-resize',
      t: 'text',
      wr: 'w-resize',
      w: 'wait',
      zi: 'zoom-in',
      zo: 'zoom-out'
    },
    visibility: {
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      v: 'visible',
      h: 'hidden',
      c: 'collapse'
    },
    overflow: {
      v: 'visible',
      h: 'hidden',
      s: 'scroll',
      a: 'auto'
    },
    'overflow-x': {
      v: 'visible',
      h: 'hidden',
      s: 'scroll',
      a: 'auto'
    },
    'overflow-y': {
      v: 'visible',
      h: 'hidden',
      s: 'scroll',
      a: 'auto'
    },
    'text-align': {
      c: 'center',
      l: 'left',
      r: 'right',
      j: 'justify'
    },
    'vertical-align': {
      t: 'top',
      b: 'bottom',
      m: 'middle'
    },
    'text-decoration': {
      n: 'none',
      ov: 'overline',
      lt: 'line-through',
      ul: 'underline'
    },
    'text-transform': {
      u: 'uppercase',
      l: 'lowercase',
      c: 'capitalize'
    },
    'align-content': {
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      sb: 'space-between',
      sa: 'space-around'
    },
    'justify-content': {
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      sb: 'space-between',
      sa: 'space-around'
    },
    'align-items': {
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      b: 'baseline'
    },
    'align-self': {
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      b: 'baseline'
    },
    'flex-wrap': {
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
    },
    'flex-direction': {
      u: 'unset',
      ini: 'initial',
      inh: 'inherit',
      nr: 'nowrap',
      w: 'wrap',
      wr: 'wrap-reverse'
    },
    'border-style': {
      s: 'solid',
      r: 'ridge',
      g: 'groove',
      i: 'inset',
      o: 'outset',
      n: 'none',
      h: 'hidden'
    },
    float: {
      r: 'right',
      l: 'left'
    },
    'list-style-type': {
      n: 'none',
      d: 'disc',
      c: 'circle',
      s: 'square',
      d: 'decimal',
      dlz: 'decimal-leading-zero',
      a: 'armenian',
      g: 'georgian',
      la: 'lower-alpha',
      ua: 'upper-alpha',
      lg: 'lower-greek',
      ll: 'lower-latin',
      ul: 'upper-latin',
      lr: 'lower-roman',
      ur: 'upper-roman',
      inh: 'inherit'
    },
    outline: {
      n: 'none'
    },
    'word-break': {
      n: 'normal',
      ba: 'break-all',
      ka: 'keep-all',
      ini: 'initial',
      inh: 'inherit'
    },
    'word-wrap': {
      n: 'normal',
      bw: 'break-word',
      ini: 'initial',
      inh: 'inherit'
    },
    'white-space': {
      n: 'normal',
      p: 'pre',
      nw: 'nowrap',
      pl: 'pre-line',
      pw: 'pre-wrap',
      ini: 'initial',
      inh: 'inherit'
    },
    'box-sizing': {
      cb: 'content-box',
      pb: 'padding-box',
      bb: 'border-box',
      ini: 'initial',
      inh: 'inherit'
    },
    clear: {
      l: 'left',
      r: 'right',
      a: 'auto',
      b: 'both',
      n: 'none',
      ini: 'initial',
      inh: 'inherit'
    }
  }

  const CSS_COLORS = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];

  const MEDIA_QUERIES = {
    'xso': '(min-width: 0px) and (max-width: 575.8px)',
    'smo': '(min-width: 576px) and (max-width: 767.8px)',
    'mdo': '(min-width: 768px) and (max-width: 991.8px)',
    'lgo': '(min-width: 992px) and (max-width: 1199.8px)',
    'xlo': '(min-width: 1200px)',
    'xs': '(max-width: 575.8px)',
    'sm': '(max-width: 767.8px)',
    'md': '(max-width: 991.8px)',
    'lg': '(max-width: 1199.8px)',
    'xl': '(min-width: 1200px)',
  }

  const fn = {
    isPropConstant: (prop, val) => {
      let constant = false;
      if (Object.keys(CONSTANT_PROPS).indexOf(prop) > -1 && !val.startsWith('.') && !fn.isValColor(val) && !fn.containsUnit(val)) {
        constant = true;
      }
      return constant;
    },
    isPropBorder: prop => Object.keys(BORDER_PROPS).indexOf(prop) > -1,
    isClassRegular: cn => (cn.match(/:/g) || []).length == 1,
    isClassBorder: cn => (cn.match(/:/g) || []).length == 3,
    isClassMedia: cn => cn.startsWith('@'),
    isValColor: val => CSS_COLORS.map(c => c.toLowerCase()).includes(val.replace('!', '')),
    isValImportant: val => val.endsWith('!') ? [val.slice(0, -1), true] : [val, false],
    containsUnit: val => {
      if (val == 'ini' || val == 'inh') {
        return false;
      } else {
        const regex = /\.|#|em|ex|ch|rem|vw|vh|vmin|vmax|%|cm|mm|in|px|pt|pc/g;
        return (val.match(regex) || '').length != 0;
      }
    },
    getValAndProp: (prop, val, cn) => {
      if (fn.isPropConstant(prop, val)) {
        val = CONSTANT_VALS[CONSTANT_PROPS[prop]][val];
        prop = CONSTANT_PROPS[prop];
      } else if (fn.isClassBorder(cn) || fn.isPropBorder(prop) && fn.isClassMedia(cn.substr(1))) {
        prop = BORDER_PROPS[prop];
      } else {
        prop = VARIABLE_PROPS[prop];
      }
      return [val, prop];
    },
    saveRule: (cn, prop, val, mq = false) => {
      let isImportant;
      [val, isImportant] = fn.isValImportant(val);
      [val, prop] = fn.getValAndProp(prop, val, cn);
      val = isImportant ? `${val} !important` : val;

      if (mq) {
      	var [mq, vp] = mq.split('@');
      	const rule = `@media ${mq} {.${cn} {${prop}: ${val}; }}`;
      	if(vp.length==2){
      		viewPorts[vp].push(rule)
      	} else {
      		mediaQueryCSS.push(rule);
      	}
      } else {
        regularCSS.push(`.${cn} {${prop}: ${val}}`);
      }
    },
    ruleExist: selector => {
      for (const iterator of style.sheet.rules) {
        const isMediaRule = iterator.cssRules != undefined;
        if (isMediaRule && selector == iterator.cssRules[0].selectorText) {
          return true;
        } else if (selector == iterator.selectorText) {
          return true;
        }
      }
    },
    insertRules: () => {
    	mediaQueryCSS.map(rc=>style.sheet.insertRule(rc));
		  for(let vp in viewPorts){
		  	viewPorts[vp].map(rc=>style.sheet.insertRule(rc))
		  }
		  regularCSS.map(rc=>style.sheet.insertRule(rc));
    }
  }

  const regularCSS = [];
  const mediaQueryCSS = [];
  const viewPorts = {
  	xs: [],
  	sm: [],
		md: [],
		lg: [],
		xl: []
  }

  const style = document.createElement('style');
  document.head.appendChild(style);
  const els = document.querySelectorAll('[class*=":"]');

  for (const el of els) {
    for (let className of el.classList) {
      if (className.indexOf(':') != -1) {
      	className = className.toLowerCase();
	      const replaceChars = {':': '\\:', '#': '\\#', '\.': '\\.', '!': '\\!', '@': '\\@'}
	      const newClassName = className.replace(/:|#|\.|!|@/g, char => replaceChars[char]);
	      let mediaQuery = false;

	      if(!fn.ruleExist(`.${newClassName}`)){
	        if (fn.isClassMedia(className)) {
	          if (fn.isClassRegular(className.substr(className.split(':')[0].length + 1))) {
	            var [mediaRule, prop, val] = className.split(':');
	          } else {
	            var [mediaRule, prop, bwidth, bstyle, bcolor] = className.split(':');
	            var val = `${bwidth} ${CONSTANT_VALS['border-style'][bstyle]} ${bcolor}`;
	          }
	          mediaQuery = MEDIA_QUERIES[mediaRule.substr(1)]+mediaRule;
	        } else if (fn.isClassRegular(className)) {
	          var [prop, val] = className.split(':');
	        } else if (fn.isClassBorder(className)) {
	          var [prop, bwidth, bstyle, bcolor] = className.split(':');
	          var val = `${bwidth} ${CONSTANT_VALS['border-style'][bstyle]} ${bcolor}`;
	        }
	      }

	      fn.saveRule(newClassName, prop, val, mediaQuery);
      }
    }
  }

  fn.insertRules();
});