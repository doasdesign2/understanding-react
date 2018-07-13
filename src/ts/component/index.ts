'use strict'

import {
  renderDOM,
  setAttr,
  setAttrs,
  setChildren
} from '../render/index'

type childType = {
  type: string,
  children: any[],
  props: {
    [index: string]: any
  }
}

const updateDOM = (dom: HTMLElement, vDOM: any) => {
  [].forEach.call(vDOM.children, (child: childType, i: number): void => {
    const childNode = (<HTMLInputElement>dom.childNodes[i])
    if (childNode && child.type === childNode.tagName.toLowerCase()) {
      // console.log(childNode.tagName)
      setAttrs(child, childNode)
      // updateDOM(childNode, child)
    } else if (childNode && child.type !== childNode.tagName.toLowerCase() && dom.childNodes.length > vDOM.children.length) {
      childNode.remove()
      updateDOM(dom, vDOM)
      // setAttrs(child, dom.childNodes[i])
    } else {
      const elem = document.createElement(child.type)
      setAttrs(vDOM.children[i], elem)
      dom.insertBefore(elem, childNode)
    }
    child.children && updateDOM(childNode, child)
  })

  return dom
}

const cleanDOM = (dom: HTMLElement, vDOM: any) => {
  for (let j = dom.childNodes.length; j > vDOM.children.length; j--) {
    dom.childNodes[j].remove()
  }
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
      const vDOM = this.render()
      const dom = updateDOM(this.currentDOM, vDOM)
      // cleanDOM(dom, vDOM)
    }
  }

  render () {

  }
}

export default Component
