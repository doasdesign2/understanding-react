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

export const renderDom = (setChildren: Function, setAttrs: Function): Function =>
  (vDom: any, wrapper?: HTMLElement): HTMLElement => {
    try {
      const elem = document.createElement(vDom.tagName)
      const dom = append(elem, wrapper)
      setChildren(renderDom)(vDom, dom)
      setAttrs(vDom, dom)
      return dom
    } catch (err) {
      throw new Error('Invalid DOM')
    }
  }

export const setChildren = (renderDom: Function): Function =>
  (vDom: any, dom: HTMLElement): HTMLElement => {
    vDom.children && vDom.children.forEach((child: any): void => {
      renderDom(setChildren, setAttrs)(child, dom)
    })
    return dom
  }

export const setAttrs = (vDom: { props: any }, dom: HTMLElement): HTMLElement => {
  for (const prop in vDom.props) {
    setAttr(dom, prop, vDom.props[prop])
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
  } else if (hasValidAttr(prop)) {
    dom.setAttribute(prop, value)
  } else {
    throw new Error('Invalid attribute')
  }
  return dom
}

class MiniReact {
  static render (vDom: any, wrapper?: HTMLElement): void {
    const vDomCons = vDom.constructor
    const instance = new (vDomCons)(vDomCons.props)
    return renderDom(setChildren, setAttrs)(instance.render(), wrapper)
  }
}

export default MiniReact
