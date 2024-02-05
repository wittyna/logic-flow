import {MetaNode} from "@isc-logic-flow/types";

export const condition: MetaNode = {
  name: 'condition',
  title: "条件",
  props: [{
    name: 'exp',
    title: '条件表达式',
    setter: 'string',
  }],
  initialBlocks() {
    return [{nodes: []}, {nodes: []}]
  },
  compiler: ({props = {}, blocks}, innerBlockCompiler, value2Exp) => {
    return `if (${value2Exp(props!.exp)}){
  ${innerBlockCompiler(blocks![0])} 
} else {
  ${innerBlockCompiler(blocks![1])}
}`
  }
}