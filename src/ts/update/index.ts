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

export const isTypeEqualTagName = (vElem: any, node: HTMLElement) =>
  node && vElem.type === node.tagName.toLowerCase()

export const hasDOMmoreChildrenThanVDOM = (childNodes: NodeListOf<Node & ChildNode>, children: any[]) =>
  childNodes.length > children.length

export const updateDOM = (dom: HTMLElement, vDOM: any) => {
  [].forEach.call(vDOM.children, (vChild: childType, i: number): void => {
    const childNode = (<HTMLInputElement>dom.childNodes[i])
    if (isTypeEqualTagName(vChild, childNode)) {
      setAttrs(vChild, childNode)
    } else if (!isTypeEqualTagName(vChild, childNode) && hasDOMmoreChildrenThanVDOM(dom.childNodes, vDOM.children)) {
      childNode.remove()
      updateDOM(dom, vDOM)
    } else {
      const elem = document.createElement(vChild.type)
      setAttrs(vDOM.children[i], elem)
      dom.insertBefore(elem, childNode)
    }
    vChild.children && updateDOM(childNode, vChild)
  })

  return dom
}

type stateType = {
  [index: string]: any
}

export const shouldComponentUpdate = (nextState: stateType, prevState: stateType): boolean =>
  !Object.keys(nextState).every((key: string): boolean =>
    nextState[key] === prevState[key]
  )

class Component {
  currentDOM: HTMLElement
  currentVDOM: HTMLElement
  props: {}
  state: any

  setState (nextState: Function|{}) {
    const state = typeof nextState === 'function' ? nextState() : nextState
    if (this.currentDOM && shouldComponentUpdate(state, this.state)) {
      this.state = {
        ...this.state,
        ...state
      }
      const vDOM = this.render()
      const dom = updateDOM(this.currentDOM, vDOM)
    }
  }

  render () {}
}

export default Component
