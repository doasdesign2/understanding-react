'use strict'

import Component from './update/index'
import MiniReact from './render/index'
import createElement from './create-element/index'

interface Window {
  Component: any,
  MiniReact: any,
  node: any
}

declare const window: Window

window.Component = Component
window.MiniReact = MiniReact
window.node = createElement
