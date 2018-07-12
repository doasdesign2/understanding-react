'use strict'

import Component from '../component/index'
import node from '../node/index'

export default class AppMock extends Component {
  render () {
    return NodeMock
  }
}

export const NodeMock = node({
  tagName: 'div',
  children: [
    {
      tagName: 'h1',
      textContent: 'Ajuste de limite'
    }, {
      tagName: 'input',
      type: 'text',
      value: '2500',
      onchange: () => {}
    }, {
      tagName: 'p',
      textContent: 'R$ 2500 disponíveis'
    }, {
      tagName: 'input',
      type: 'range',
      min: 0,
      max: 5000,
      value: 2500,
      onchange: () => {}
    }
  ]
})

export const ResultMock = '<h1>Ajuste de limite</h1><input type="text"><p>R$ 2500 disponíveis</p><input type="range" min="0" max="5000">'