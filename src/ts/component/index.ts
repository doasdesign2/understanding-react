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

  for (const key in pool) {
    pool[key].remove();
  }

  console.log(dom)

  for (const attr of Array.from(dom.attributes)) {
    dom.removeAttribute(attr.name)
  }

  setAttrs(vDOM, dom)

  return dom
}

class Component {
  currentDOM: HTMLElement
  state: {}

  setState (nextState: Function|{}) {
    if (typeof nextState === 'function') {
      this.state = {
        ...this.state,
        ...nextState()
      }
    } else if (typeof nextState === 'object') {
      this.state = {
        ...this.state,
        ...nextState
      }
    }
    updateDOM(this.currentDOM, this.render())
  }

  render () {

  }
}

export default Component
