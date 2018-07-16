'use strict'

import { VALID_ELEMS } from './valid-elems'
import { VALID_ATTRS } from './valid-attrs'

type vDOMType = {
  type: string,
  children: any[],
  props: {
    [index: string]: any
  }
}

/**
 * Append the element if the function receives a container, if not it returns the own element
 *
 * @param {HTMLElement} elem element to be appended
 * @param {HTMLElement} [wrapper] container to receive the element
 * @returns {HTMLElement} mounted DOM
 */
export const append = (elem: HTMLElement, wrapper?: HTMLElement): HTMLElement => {
  try {
    return wrapper ? wrapper.appendChild(elem) : elem
  } catch (err) {
    throw new Error('Wasn`t possible to append or set an element')
  }
}

/**
 * Renders the DOM element, calling the functions which renders the children
 * and set the attributes
 *
 * @param {Function} setChildren function received as dependency injection
 * @param {Function} setAttrs function received as dependency injection
 * @returns {Function}
  * @param {vDOMType} vDOM virtual DOM of the element
  * @param {HTMLElement} [wrapper] the container element to receive the appended element
  * @returns {HTMLElement} DOM tree fully mounted
  */
export const renderDOM = (setChildren: Function, setAttrs: Function): Function =>
  (vDOM: vDOMType, wrapper?: HTMLElement): HTMLElement => {
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

/**
 * Renders the children of the DOM element according to its virtual DOM
 *
 * @param {Function} renderDOM render function received as dependency injection
 * @returns {Function}
  * @param {vDOMType} vDOM virtual DOM of the element with the children node
  * @param {HTMLElement} dom element to be passed as wrapper of its children
  * @returns {HTMLElement} element mounted with children
  */
export const setChildren = (renderDOM: Function): Function =>
  (vDOM: vDOMType, dom: HTMLElement): HTMLElement => {
    vDOM.children && vDOM.children.forEach((child: any): void => {
      try {
        renderDOM(setChildren, setAttrs)(child, dom)
      } catch (err) {
        throw new Error('Failed to execute renderDOM')
      }
    })
    return dom
  }

/**
 * Set all element`s attributes creating a loop with the prop`s object
 *
 * @param {vDOMType} vDOM Virtual DOM of the element
 * @param {HTMLElement} dom element to receive the attributes
 * @returns {HTMLElement} element mounted with the attributes
 */
export const setAttrs = (vDOM: vDOMType, dom: HTMLElement): HTMLElement => {
  for (const prop in vDOM.props) {
    setAttr(dom, prop, vDOM.props[prop])
  }
  return dom
}

/**
 * Checks if the prop is a Text Node
 *
 * @param {string} prop prop received from virtual DOM
 * @param {*} value value received from virtual DOM
 * @returns {boolean}
 */
export const isTextNode = (prop: string, value: any): boolean =>
  prop === 'textContent' && typeof value === 'string' || typeof value === 'number'

/**
 * Checks if the prop is an Event
 *
 * @param {string} prop prop received from virtual DOM
 * @param {*} value value received from virtual DOM
 * @returns {boolean}
 */
export const isEvent = (prop: string, value: any): boolean =>
  prop.startsWith('on') && typeof value === 'function'

/**
 * Checks if the element is an input with prop value
 *
 * @param {string} tagName name of the tag
 * @param {string} prop prop received from virtual DOM
 * @returns {boolean}
 */
export const isInputAndValue = (tagName: string, prop: string): boolean =>
  tagName === 'INPUT' && prop === 'value'

/**
 * Checks if the received tagName is valid according to the list
 *
 * @param {string} tagName name of the tag
 * @returns {boolean}
 */
export const hasValidElem = (tagName: string): boolean =>
  VALID_ELEMS.includes(tagName.toLowerCase())

/**
 * Checks if the received prop is a valid attribute according to the list
 *
 * @param {string} prop prop received from virtual DOM
 * @returns {boolean}
 */
export const hasValidAttr = (prop: string): boolean =>
  VALID_ATTRS.includes(prop)

interface HTMLElement {
  [index: string]: any
}

/**
 * Sets each attribute in the DOM element according to its type
 *
 * @param {HTMLElement} dom element to have the attribute set
 * @param {string} prop prop received from virtual DOM
 * @param {*} value value received from virtual DOM
 * @returns {HTMLElement} element mounted with the attributes
 */
export const setAttr = (dom: HTMLElement, prop: string, value: any): HTMLElement => {
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

/**
 * Public class that initializes the application
 *
 * @class MiniReact
 */
class MiniReact {
/**
 * Instantiates the App class and renders it, saving the instance returning it
 *
 * @static
 * @param {*} vDOM the App class
 * @param {HTMLElement} [wrapper] the container element
 * @returns {void}
 * @memberof MiniReact
 */
static render (vDOM: any, wrapper?: HTMLElement): void {
    const vDOMCons = vDOM.constructor
    const instance = new (vDOMCons)()
    instance.currentDOM = renderDOM(setChildren, setAttrs)(instance.render(), wrapper)
    return instance.currentDOM
  }
}

export default MiniReact
