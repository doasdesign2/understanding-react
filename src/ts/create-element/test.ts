'use strict';

import node from './index'
import { expect } from 'chai'

describe('node should:', () => {
  it('be a function', () => {
    expect(node).to.be.a('function')
  })
})