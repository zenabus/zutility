/*!
 * Zutility v1.1.2
 *
 * https://github.com/zenabus
 *
 * Copyright (c) 2020 Francisco Ibañez III
 * Free to use under the MIT license.
 */
 
document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  // insertRule Polyfill
  (function(Sheet_proto){
    var originalInsertRule = Sheet_proto.insertRule;

    if (originalInsertRule.length === 2){ // 2 mandatory arguments: (selector, rules)
      Sheet_proto.insertRule = function(selectorAndRule){
        // First, separate the selector from the rule
        a: for (var i=0, Len=selectorAndRule.length, isEscaped=0, newCharCode=0; i !== Len; ++i) {
          newCharCode = selectorAndRule.charCodeAt(i);
          if (!isEscaped && (newCharCode === 123)) { // 123 = "{".charCodeAt(0)
            // Secondly, find the last closing bracket
            var openBracketPos = i, closeBracketPos = -1;

            for (; i !== Len; ++i) {
              newCharCode = selectorAndRule.charCodeAt(i);
              if (!isEscaped && (newCharCode === 125)) { // 125 = "}".charCodeAt(0)
                closeBracketPos = i;
              }
              isEscaped ^= newCharCode===92?1:isEscaped; // 92 = "\\".charCodeAt(0)
            }

            if (closeBracketPos === -1) break a; // No closing bracket was found!
              /*else*/ return originalInsertRule.call(
              this, // the sheet to be changed
              selectorAndRule.substring(0, openBracketPos), // The selector
              selectorAndRule.substring(closeBracketPos), // The rule
              arguments[3] // The insert index
            );
          }

          // Works by if the char code is a backslash, then isEscaped
          // gets flipped (XOR-ed by 1), and if it is not a backslash
          // then isEscaped gets XORed by itself, zeroing it
          isEscaped ^= newCharCode===92?1:isEscaped; // 92 = "\\".charCodeAt(0)
        }
        // Else, there is no unescaped bracket
        return originalInsertRule.call(this, selectorAndRule, "", arguments[2]);
      };
    }
  })(CSSStyleSheet.prototype);

  const variableProps = {
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

  const constantProps = {
  	ac: 'align-content',
		ai: 'align-items',
		as: 'align-self',
		b: 'border',
    bt: 'border-top',
    br: 'border-right',
    bb: 'border-bottom',
    bl: 'border-left',
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

  const constantVals = {
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
    'word-wrap':{
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

  const style = document.createElement('style');
  document.head.appendChild(style);

  const fn = {
    ruleExist: (selector) => {
      for (const iterator of style.sheet.rules) {
      	if(selector == iterator.selectorText){
      		return true;
      	}
      }
    },
    isConstantProp: (prop) => {
      let constant = false;
      for (const key in constantProps) {
        if (key == prop) {
          constant = true;
        }
      }
      return constant;
    }
  }

  const els = document.querySelectorAll('[class*=":"]');
  for (const el of els) {
    for (const className of el.classList) {
      if(className.indexOf(':') != -1){
      	let replaceChars = {':':'\\:', '#':'\\#', '\.':'\\.', '!':'\\!'}
        let newClassName = className.replace(/:|#|\.|!/g, char=>replaceChars[char]);
        if ((className.match(/:/g) || []).length == 1) {
          let newProp;
          let [prop, val] = className.split(':');

          if (fn.isConstantProp(prop) && val.length <= 2 && !val.startsWith('.')) {
            val = val.length <= 2 ? constantVals[constantProps[prop]][val] : val;
            newProp = constantProps[prop]
          } else {
            newProp = variableProps[prop]
          }

          val = className.endsWith('!') ? `${val.replace('!',' !important')}` : val;
          if(!fn.ruleExist(`.${newClassName}`)){
          	style.sheet.insertRule(`.${newClassName} {${newProp}: ${val}}`);
          }
        } else {
          let [prop, bwidth, bstyle, bcolor] = className.split(':');
          if (prop.indexOf('b') == 0) {
          	if(!fn.ruleExist(`.${newClassName}`)){
		  				style.sheet.insertRule(`.${newClassName} {${constantProps[prop]}: ${bwidth} ${constantVals['border-style'][bstyle]} ${bcolor}}`);
		  			}
          }
        }
      }
    }
  }
});