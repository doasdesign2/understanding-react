'use strict'

import Component from '../update/index'
import createElement from '../create-element/index'

type Event = {
  target: {
    value: any
  }
}

export default class AppMock extends Component {
  constructor() {
    super();

    this.state = {
      definedLimit: 2500,
      maxLimit: 5000,
    };
  }

  setDefinedLimit(e: Event) {
    this.setState(() => ({
      definedLimit: parseInt(e.target.value)
    }))
  }

  render () {
    return createElement({
      tagName: 'div',
      children: [
        {
          tagName: 'h1',
          textContent: 'Ajuste de limite'
        },
        {
          textContent: 'Descrição'
        },
        {
          tagName: 'input',
          type: 'text',
          value: this.state.definedLimit,
          onchange: (e: Event) => this.setDefinedLimit(e)
        },
        {
          tagName: 'p',
          textContent: `R$ ${ this.state.maxLimit - this.state.definedLimit } disponíveis`
        },
        {
          tagName: 'input',
          type: 'range',
          min: 0,
          max: this.state.maxLimit,
          value: this.state.definedLimit,
          onchange: (e: Event) => this.setDefinedLimit(e)
        }
      ]
    })
  }
}

export const vDOMMock = {
  tagName: 'div',
  children: [
    {
      tagName: 'h1',
      textContent: 'Ajuste de limite'
    },
    {
      textContent: 'Descrição'
    },
    {
      tagName: 'input',
      type: 'text',
      value: '2500'
    },
    {
      tagName: 'p',
      textContent: 'R$ 2500 disponíveis'
    },
    {
      tagName: 'input',
      type: 'range',
      min: 0,
      max: 5000,
      value: 2500
    }
  ]
}

export const NodeMock = createElement(vDOMMock)

export const NodeUpdateMock = createElement({
  tagName: 'div',
  children: [
    {
      tagName: 'h1',
      textContent: 'Ajustando limite'
    },
    {
      textContent: 'Descrição'
    },
    {
      tagName: 'input',
      type: 'text',
      value: '3000'
    },
    {
      tagName: 'h2',
      textContent: 'R$ 3000 disponíveis'
    },
    {
      tagName: 'input',
      type: 'range',
      min: 1000,
      max: 6000,
      value: 3000
    }
  ]
})

export const ResultMock = '<h1>Ajuste de limite</h1>Descrição<input type="text"><p>R$ 2500 disponíveis</p><input type="range" min="0" max="5000">'

export const ResultUpdateMock = '<h1>Ajustando limite</h1>Descrição<input type="text"><h2>R$ 3000 disponíveis</h2><input type="range" min="1000" max="6000">'