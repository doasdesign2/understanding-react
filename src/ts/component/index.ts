'use strict'

import {
  renderDOM,
  setAttr,
  setAttrs,
  setChildren
} from '../render/index'

const updateDOM = (dom: HTMLElement, vDOM: any, parent = dom.parentNode) => {
  const pool: any = {};

  [].map.call(dom.childNodes, (child: HTMLElement, i: number) => {
    pool[`index${i}`] = child
  });

  [].map.call(vDOM.children, (child: HTMLElement, i: number) => {
    const key = `index${i}`
    const result = pool[key]
      ? updateDOM(pool[key], child)
      : renderDOM(setChildren, setAttrs)(child, dom)

    dom.appendChild(result)
    delete pool[key]
  })

  setAttrs(vDOM, dom)

  return dom
}

class Component {
  currentDOM: HTMLElement
  currentVDOM: HTMLElement
  props: {}
  state: any

  shouldComponentUpdate (nextState: any): boolean {
    return !Object.keys(nextState).every((key: string): boolean =>
      nextState[key] === this.state[key]
    )
  }

  setState (nextState: Function|{}) {
    const state = typeof nextState === 'function' ? nextState() : nextState
    if (this.currentDOM && this.shouldComponentUpdate(state)) {
      this.state = {
        ...this.state,
        ...state
      }
      updateDOM(this.currentDOM, this.render())
    }
  }

  render () {

  }
}

export default Component
