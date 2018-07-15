'use strict';

import Component, {
  isTypeEqualTagName,
  hasDOMmoreChildrenThanVDOM,
  updateDOM,
  shouldComponentUpdate
} from './index'
import {
  NodeMock,
  NodeUpdateMock,
  ResultMock,
  ResultUpdateMock,
  vDOMMock
} from '../mocks/index'
import chai, { expect } from 'chai'
import chaiDom from 'chai-dom'

chai.use(chaiDom)

describe('isTypeEqualTagName should:' , () => {
  it('return true if type is equal tagName', () => {
    const vElem = { type: 'div' }
    const div = document.createElement('div')
    expect(isTypeEqualTagName(vElem, div)).to.be.ok
  })

  it('return false if type diff from tagName', () => {
    const vElem = { type: 'input' }
    const div = document.createElement('ul')
    expect(isTypeEqualTagName(vElem, div)).to.be.not.ok
  })
})

describe('hasDOMmoreChildrenThanVDOM should:', () => {
  const div = document.createElement('div')

  it('return true if DOM has more children than vDOM', () => {
    const innerHTML = '<h1>Title</h1><h2>Subtitle</h2><input /><p>Text</p><input />'
    div.innerHTML = innerHTML

    expect(hasDOMmoreChildrenThanVDOM(div.childNodes, vDOMMock.children)).to.be.ok
  })

  it('return false if DOM has less children than vDOM', () => {
    const innerHTML = '<h1>Title</h1><input /><p>Text</p>'
    div.innerHTML = innerHTML

    expect(hasDOMmoreChildrenThanVDOM(div.childNodes, vDOMMock.children)).to.be.not.ok
  })

  it('return false if DOM has equal children quantity than vDOM', () => {
    const innerHTML2 = '<h1>Title</h1><input /><p>Text</p><input />'
    div.innerHTML = innerHTML2

    expect(hasDOMmoreChildrenThanVDOM(div.childNodes, vDOMMock.children)).to.be.not.ok
  })
})

describe('updateDOM should:', () => {
  it ('just update the attributes if the element type is the same, removes if it is different and insert if it is missing', () => {
    const div = document.createElement('div')
    div.innerHTML = ResultMock
    expect(updateDOM(div, NodeUpdateMock)).to.have.html(ResultUpdateMock)
  })
})

describe('shouldComponentUpdate should:', () => {
  it('return true if the state changes', () => {
    const nextState = {
      state2: 'state2',
      state3: 'state3'
    }

    const prevState = {
      state1: 'State 1',
      state2: 'State 2'
    }

    expect(shouldComponentUpdate(nextState, prevState)).to.be.ok
  })

  it('return false if the state is already present', () => {
    const nextState = {
      state1: 'State 1',
      state2: 'State 2'
    }

    const prevState = {
      state1: 'State 1',
      state2: 'State 2'
    }

    expect(shouldComponentUpdate(nextState, prevState)).to.be.not.ok
  })

  it('return false if there isn´t nextState', () => {
    const nextState = {}

    const prevState = {
      state1: 'State 1',
      state2: 'State 2'
    }

    expect(shouldComponentUpdate(nextState, prevState)).to.be.not.ok
  })
})