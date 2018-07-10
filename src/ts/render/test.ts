'use strict'

import { expect } from 'chai'
// import { JSDOM } from 'jsdom'
import {
  append,
  renderDom,
  setChildren,
  setAttrs,
  isTextNode,
  isEvent,
  hasValidElem,
  hasValidAttr,
  setAttr
} from './index'

describe('append should:', () => {
  it('be a function', () => {
    expect(append).to.be.a('function')
  })

  it('return the own element if hasn`t a wrapper', () => {
    const div = document.createElement('div')
    div.textContent = 'teste'
    expect(append(div)).to.be.deep.equal(div)
  })

  it('return the element inside the wrapper', () => {
    const p = document.createElement('p')
    p.textContent = 'teste'
    const div = document.createElement('div')
    const appended = div.appendChild(p)
    expect(append(p, div)).to.be.deep.equal(appended)
  })
})

describe('renderDom should:', () => {
  it('be a function', () => {
    expect(renderDom).to.be.a('function')
  })
})

describe('setChildren should:', () => {
  it('be a function', () => {
    expect(setChildren).to.be.a('function')
  })
})

describe('setAttrs should:', () => {
  it('be a function', () => {
    expect(setAttrs).to.be.a('function')
  })
})

describe('isTextNode should:', () => {
  it('be a function', () => {
    expect(isTextNode).to.be.a('function')
  })

  it('return true if prop is textContent and value is string', () => {
    expect(isTextNode('textContent', 'text')).to.be.ok
  })

  it('return false if prop isn`t textContent or value isn`t string or neither', () => {
    expect(isTextNode('textContente', 'text')).to.be.not.ok
    expect(isTextNode('textContent', true)).to.be.not.ok
    expect(isTextNode('extContent', 123)).to.be.not.ok
  })
})

describe('isEvent should:', () => {
  it('be a function', () => {
    expect(isEvent).to.be.a('function')
  })

  it('return true if prop starts with on and value is a function', () => {
    expect(isEvent('onchange', () => {})).to.be.ok
  })

  it('return false if prop doesn`t starts with on and value isn`t a function or neither', () => {
    expect(isEvent('nchange', () => {})).to.be.not.ok
    expect(isEvent('onchange', 'text')).to.be.not.ok
    expect(isEvent('nchange', true)).to.be.not.ok
  })
})

describe('hasValidElem should:', () => {
  it('be a function', () => {
    expect(hasValidElem).a('function')
  })

  it('return true if has valid elements', () => {
    expect(hasValidElem('DIV')).to.be.ok
    expect(hasValidElem('INPUT')).to.be.ok
    expect(hasValidElem('H1')).to.be.ok
    expect(hasValidElem('P')).to.be.ok
  })

  it('return false if hasn`t valid elements', () => {
    expect(hasValidElem('EMBED')).to.be.not.ok
    expect(hasValidElem('SVG')).to.be.not.ok
    expect(hasValidElem('IMG')).to.be.not.ok
  })
})

describe('hasValidAttr should:', () => {
  it('be a function', () => {
    expect(hasValidAttr).a('function')
  })

  it('return true if has valid attributes', () => {
    expect(hasValidAttr('type')).to.be.ok
    expect(hasValidAttr('min')).to.be.ok
  })

  it('return false if hasn`t valid attributes', () => {
    expect(hasValidAttr('dasd')).to.be.not.ok
    expect(hasValidAttr('text')).to.be.not.ok
    expect(hasValidAttr('true')).to.be.not.ok
  })
})

describe('setAttr should:', () => {

  it('be a function', () => {
    expect(setAttr).to.be.a('function')
  })

  it('put a text node if is textContent', () => {
    const div = document.createElement('div')
    const elem = setAttr(div, 'textContent', 'texto')
    expect(elem.tagName).to.be.equal('DIV')
    expect(elem.textContent).to.be.equal('texto')
  })

  it('put an event if it receives an event', () => {
    const input = document.createElement('input')
    const elem = setAttr(input, 'onchange', () => 'hello')
    expect(elem.tagName).to.be.deep.equal('INPUT')
  })

  it('set attribute if is a listed DOM element', () => {
    const elem = setAttr(document.createElement('input'), 'type', 'text')
    expect(elem.tagName).to.be.deep.equal('INPUT')
    expect(elem.getAttribute('type')).to.be.deep.equal('text')
  })

  it('throw an error if hasn`t a valid elem', () => {
    let msg
    try {
      setAttr(document.createElement('SVG'), 'type', 'text')
    } catch (err) {
      msg = err
    }
    expect(msg).to.be.a('Error')
  })

  it('throw an error if hasn`t a valid attribute', () => {
    let msg
    try {
      setAttr(document.createElement('h1'), 'style', 'text')
    } catch (err) {
      msg = err
    }
    expect(msg).to.be.a('Error')
  })
})