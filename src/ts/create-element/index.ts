'use strict'

type NodeBase = {
  children?: any[],
  props?: {}
}

interface Node extends NodeBase {
  tagName: string
}

interface NodeReturn extends NodeBase {
  type: string
}

const createElement = ({ tagName, children = [], ...props }: Node): NodeReturn => ({
  type: tagName,
  props,
  children: children.map(child => createElement(child))
})

export default createElement
