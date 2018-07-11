'use strict'

import {
  renderDOM,
  setAttr,
  setAttrs,
  setChildren
} from '../render/index'

const updateDOM = (dom: HTMLElement, vDom: any, parent = dom.parentNode) => {
  const pool: any = {};

  [].map.call(dom.childNodes, (child: HTMLElement, i: number) => {
    pool[`index${i}`] = child
  });

  [].map.call(vDom.children, (child: HTMLElement, i: number) => {
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

  for (const attr of Array.from(dom.attributes)) dom.removeAttribute(attr.name)
  for (const prop in vDom.props) setAttr(dom, prop, vDom.props[prop])

  return dom
}

class Component {
  current: HTMLElement
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
    updateDOM(this.current, this.render())
  }

  render () {

  }
}

export default Component
