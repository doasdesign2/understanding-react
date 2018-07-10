'use strict'

interface Node {
  tagName?: string,
  children: any[],
  props?: {}
}

const node = ({ tagName, children = [], ...props }: Node): Node => ({
  tagName,
  props,
  children: children.map(child => node(child))
})

export default node
