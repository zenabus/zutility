/*!
 * Zutility v1.0.0
 *
 * https://github.com/zenabus
 *
 * Copyright (c) 2020 Francisco Ibañez III
 * Free to use under the MIT license.
 */

document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  const style = document.createElement('style');
  document.head.appendChild(style);

  const intProps = {
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
    mnw: 'min-width',
    mxw: 'max-width',
    h: 'height',
    mnh: 'min-height',
    mxh: 'max-height',
    t: 'top',
    l: 'left',
    b: 'bottom',
    r: 'right',
    bg: 'background',
    c: 'color',
    ws: 'word-spacing',
    ti: 'text-indent',
    br: 'border-radius',
    fs: 'font-size',
    fw: 'font-weight',
    o: 'opacity',
    ti: 'text-indent',
    ls: 'letter-spacing',
    lh: 'line-height',
    ws: 'word-spacing',
    fg: 'flex-grow',
    fsh: 'flex-shrink',
    fb: 'flex-basis'
  }

  const strProps = {
    c: 'cursor',
    d: 'display',
    p: 'position',
    f: 'flex',
    v: 'visibility',
    of: 'overflow',
    ofx: 'overflow-x',
    ofy: 'overflow-y',
    ta: 'text-align',
    va: 'vertical-align',
    td: 'text-decoration',
    tt: 'text-transform',
    ac: 'align-content',
    jc: 'justify-content',
    ai: 'align-items',
    as: 'align-self',
    fd: 'flex-direction', 
    fw: 'flex-wrap',
    b: 'border',
    bt: 'border-top',
    br: 'border-right',
    bb: 'border-bottom',
    bl: 'border-left'    
  }

  const strVals = {
    display: {
      n: 'none',
      u: 'unset',
      inl: 'initial',
      int: 'inherit',
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
      inl: 'initial',
      int: 'inherit',
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
      inl: 'initial',
      int: 'inherit',
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
      inl: 'initial',
      int: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      sb: 'space-between',
      sa: 'space-around'
    },
    'justify-content': {
      u: 'unset',
      inl: 'initial',
      int: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      sb: 'space-between',
      sa: 'space-around'
    },
    'align-items': {
      u: 'unset',
      inl: 'initial',
      int: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      b: 'baseline'
    },
    'align-self': {
      u: 'unset',
      inl: 'initial',
      int: 'inherit',
      s: 'stretch',
      c: 'center',
      fs: 'flex-start',
      fe: 'flex-end',
      b: 'baseline'
    },
    'flex-wrap': {
      u: 'unset',
      inl: 'initial',
      int: 'inherit',
    },
    'flex-direction': {
      u: 'unset',
      inl: 'initial',
      int: 'inherit',
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
    }
  }

  const fn = {
    styleExist: (selector) => {
      for (const iterator of style.sheet.rules) {
        return selector === iterator.selectorText ? true : false;
      }
    },
    isStrProp: (prop) => {
      let str = false;
      for (const key in strProps) {
        if (key == prop) {
          str = true;
        }
      }
      return str;
    },
    isStrVal: (val, prop) => {
      let str = false;
      for (const key in strVals[prop]) {
        if (key == val) {
          str = true;
        }
      }
      return str;
    }
  }

  const els = document.querySelectorAll('[class*=":"]');
  for (const el of els) {
    for (const className of el.classList) {
      if(className.indexOf(':') != -1){
        const newClassName = window.btoa(className).replace(/=/g, '');
        el.classList.replace(className, newClassName);

        if ((className.match(/:/g) || []).length == 1) {
          let newProp;
          let [prop, val] = className.split(':');

          if (fn.isStrProp(prop) && val.length <= 2) {
            val = val.length <= 2 ? strVals[strProps[prop]][val] : val;
            newProp = strProps[prop]
          } else {
            newProp = intProps[prop]
          }

          style.sheet.insertRule(`.${newClassName} {${newProp}: ${val}}`);
        } else {
          let [prop, bwidth, bstyle, bcolor] = className.split(':');
          if (prop.indexOf('b') == 0) {
            style.sheet.insertRule(`.${newClassName} {${strProps[prop]}: ${bwidth} ${strVals['border-style'][bstyle]} ${bcolor}}`);
          }
        }
      }
    }
  }
});