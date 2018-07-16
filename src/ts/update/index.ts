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

/**
 * Checks if the tagName of the instantiated element is equal to the compared virtual
 * DOM node
 *
 * @param {{ type: string }} vElem virtual DOM element node
 * @param {HTMLElement} node element node to be compared
 * @returns {boolean}
 */
export const isTypeEqualTagName = (vElem: { type: string }, node: HTMLElement): boolean =>
  node && vElem.type === node.tagName.toLowerCase()

/**
 * Checks if the rendered instantiated element DOM has more children than its
 * reference in virtual DOM
 *
 * @param {(NodeListOf<Node & ChildNode>)} childNodes list of element`s child nodes
 * @param {{}[]} children list of virtual DOM`s children
 * @returns {boolean}
 */
export const hasDOMmoreChildrenThanVDOM = (
  childNodes: NodeListOf<Node & ChildNode>,
  children: {}[]
): boolean =>
  childNodes.length > children.length

/**
 * Executes the reconciliation comparing the current instantiated DOM tree to the
 * next virtual DOM
 *
 * @param {HTMLElement} dom current instantiated DOM tree
 * @param {*} vDOM next virtual DOM
 * @returns mounted DOM
 */
export const updateDOM = (dom: HTMLElement, vDOM: any) => {
  [].forEach.call(vDOM.children, (vChild: childType, i: number): void => {
    const childNode = (<HTMLInputElement>dom.childNodes[i])
    if (!vChild.type) {
      console.log('Is text node')
    } else if (isTypeEqualTagName(vChild, childNode)) {
      setAttrs(vChild, childNode)
    } else if (!isTypeEqualTagName(vChild, childNode)
      && hasDOMmoreChildrenThanVDOM(dom.childNodes, vDOM.children)) {
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
/**
 * Checks if the state type is object, just repassing it, or is a function,
 * executing it
 *
 * @param {(Function|{})} state
 * @returns {(Function|{})}
 */
export const checkStateType = (state: Function|{}): Function|{} =>
  typeof state === 'function' ? state() : state

/**
 * Compares the previous state object with the next state object to check
 * if it needs to be updated
 *
 * @param {stateType} nextState
 * @param {stateType} prevState
 * @returns {boolean}
 */
export const shouldComponentUpdate = (nextState: stateType, prevState: stateType): boolean =>
  !Object.keys(nextState).every((key: string): boolean =>
    nextState[key] === prevState[key]
  )
/**
 * Component class extended by the App class
 *
 * @class Component
 */
class Component {
  currentDOM: HTMLElement
  currentVDOM: HTMLElement
  props: {
    [index: string]: any
  }
  state: {
    [index: string]: any
  }
/**
 * Method executed when the setState is called. It calls its render method to get
 * a new virtual DOM and renders it through updateDOM
 *
 * @param {(Function|{})} nextState
 * @memberof Component
 */
setState (nextState: Function|{}): void {
    const state = checkStateType(nextState)
    if (this.currentDOM && shouldComponentUpdate(state, this.state)) {
      this.state = {
        ...this.state,
        ...state
      }
      const vDOM = this.render()
      const dom = updateDOM(this.currentDOM, vDOM)
    }
  }

  render (): void {
    return
  }
}

export default Component
