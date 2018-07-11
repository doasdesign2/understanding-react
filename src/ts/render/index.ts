'use strict'

enum EVENTS {
  onchange = 'change'
}

const VALID_ELEMS = ['DIV', 'INPUT', 'H1', 'P']
const VALID_ATTRS = ['max', 'min', 'type', 'value']

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
      const elem = document.createElement(vDOM.tagName)
      setAttrs(vDOM, elem)
      const dom = append(elem, wrapper)
      setChildren(renderDOM)(vDOM, dom)
      return dom
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

export const setAttrs = (vDOM: { props: any }, dom: HTMLElement): HTMLElement => {
  for (const prop in vDOM.props) {
    setAttr(dom, prop, vDOM.props[prop])
  }
  return dom
}

export const isTextNode = (prop: string, value: any): boolean =>
  prop === 'textContent' && typeof value === 'string'

export const isEvent = (prop: string, value: any): boolean =>
  prop.startsWith('on') && typeof value === 'function'

export const hasValidElem = (tagName: string): boolean =>
  VALID_ELEMS.includes(tagName)

export const hasValidAttr = (prop: string): boolean =>
  VALID_ATTRS.includes(prop)

export const setAttr = (dom: HTMLElement, prop: any, value: any): HTMLElement => {
  if (!hasValidElem(dom.tagName)) {
    throw new Error('Invalid tag')
  } else if (isTextNode(prop, value)) {
    dom.textContent = value
  } else if (isEvent(prop, value)) {
    const event = EVENTS[prop]
    dom.removeEventListener(event, value)
    dom.addEventListener(event, value)
  } else if (prop === 'value') {
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
