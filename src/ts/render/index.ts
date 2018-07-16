'use strict'

import { VALID_ELEMS } from './valid-elems'
import { VALID_ATTRS } from './valid-attrs'

export const append = (elem: HTMLElement, wrapper?: HTMLElement): HTMLElement => {
  try {
    return wrapper ? wrapper.appendChild(elem) : elem
  } catch (err) {
    throw new Error('Wasn`t possible to append or set an element')
  }
}

export const renderDOM = (setChildren: Function, setAttrs: Function): Function =>
  (vDOM: any, wrapper?: HTMLElement): HTMLElement => {
    try {
      if (vDOM.type) {
        const elem = document.createElement(vDOM.type)
        setAttrs(vDOM, elem)
        setChildren(renderDOM)(vDOM, elem)
        const dom = append(elem, wrapper)
        return dom
      } else {
        const elem = document.createTextNode(vDOM.props.textContent)
        const dom = append(elem, wrapper)
        return dom
      }
    } catch (err) {
      throw new Error('Invalid DOM')
    }
  }

export const setChildren = (renderDOM: Function): Function =>
  (vDOM: any, dom: HTMLElement): HTMLElement => {
    vDOM.children && vDOM.children.forEach((child: any): void => {
      try {
        renderDOM(setChildren, setAttrs)(child, dom)
      } catch (err) {
        throw new Error('Failed to execute renderDOM')
      }
    })
    return dom
  }

type vDOMType = {
  type: string,
  children: any[],
  props: {
    [index: string]: any
  }
}

export const setAttrs = (vDOM: vDOMType, dom: HTMLElement): HTMLElement => {
  for (const prop in vDOM.props) {
    setAttr(dom, prop, vDOM.props[prop])
  }
  return dom
}

export const isTextNode = (prop: string, value: any): boolean =>
  prop === 'textContent' && typeof value === 'string' || typeof value === 'number'

export const isEvent = (prop: string, value: any): boolean =>
  prop.startsWith('on') && typeof value === 'function'

export const isInputAndValue = (tagName: string, prop: string): boolean =>
  tagName === 'INPUT' && prop === 'value'

export const hasValidElem = (tagName: string): boolean =>
  VALID_ELEMS.includes(tagName.toLowerCase())

export const hasValidAttr = (prop: string): boolean =>
  VALID_ATTRS.includes(prop)

interface HTMLElement {
  [index: string]: any
}

export const setAttr = (dom: HTMLElement, prop: any, value: any): HTMLElement => {
  if (!hasValidElem(dom.tagName)) {
    throw new Error('Invalid tag')
  } else if (isTextNode(prop, value) || isEvent(prop, value) || isInputAndValue(dom.tagName, prop)) {
    dom[prop] = value
  } else if (hasValidAttr(prop)) {
    dom.setAttribute(prop, value)
  } else {
    throw new Error('Invalid attribute')
  }
  return dom
}

class MiniReact {
  static render (vDOM: any, wrapper?: HTMLElement): void {
    const vDOMCons = vDOM.constructor
    const instance = new (vDOMCons)()
    instance.currentDOM = renderDOM(setChildren, setAttrs)(instance.render(), wrapper)
    return instance.currentDOM
  }
}

export default MiniReact
