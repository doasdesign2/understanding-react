'use strict';

import createElement from './index'
import { expect } from 'chai'
import { vDOMMock } from '../mocks/index'

describe('createElement should:', () => {
  it('convert received object to appropriate format', () => {
    const output = {
      type: 'div',
      props: {},
      children: [
        {
          type: 'h1',
          props: {
            textContent: 'Ajuste de limite'
          },
          children: []
        },
        {
          type: undefined,
          props: {
            textContent: 'Descrição'
          },
          children: []
        },
        {
          type: 'input',
          props: {
            type: 'text',
            value: '2500'
          },
          children: []
        },
        {
          type: 'p',
          props: {
            textContent: 'R$ 2500 disponíveis'
          },
          children: []
        },
        {
          type: 'input',
          props: {
            type: 'range',
            min: 0,
            max: 5000,
            value: 2500
          },
          children: []
        }
      ]
    }

    expect(createElement(vDOMMock)).to.be.deep.equal(output)
  })
})
