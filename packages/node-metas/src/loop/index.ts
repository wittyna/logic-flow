import {MetaNode} from "@isc-logic-flow/types";

export const loop: MetaNode = {
  name: 'loop',
  title: "循环",
  props: [{
    name: 'array',
    title: '循环数组',
    setter: 'string'
  }, {
    name: 'item',
    title: 'item变量名',
    setter: 'string'
  }, {
    name: 'index',
    title: 'index变量名',
    setter: 'string'
  }],
  initialBlocks() {
    return [{nodes: []}, {nodes: []}]
  },
  initialProps() {
    return {
      item: 'item',
      index: 'index',
      array: []
    }
  },
  compiler: ({props = {}, blocks = []}, innerBlockCompiler, value2Exp) => {
    return `for (let ${props.index}=0, __array__=${value2Exp(props.array)}; ${props.index}<__array__.length; ${props.index}++) {
  ${props.item} = __array__[${props.index}];
${innerBlockCompiler(blocks[0])}
}`
  }
}