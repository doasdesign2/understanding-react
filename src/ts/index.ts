'use strict'

import Component from './component/index'
import MiniReact from './render/index'
import node from './node/index'

interface Window {
  Component: any,
  MiniReact: any,
  node: any
}

declare const window: Window

window.Component = Component
window.MiniReact = MiniReact
window.node = node
