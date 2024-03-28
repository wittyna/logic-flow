import {MetaNode, SchemaBlock} from "@isc-logic-flow/types";

export const condition: MetaNode = {
  name: "condition",
  title: "条件",

  props: [{
    name: "exp",
    title: "条件表达式",
    setter: "JSExpression"
  }],
  initialChildren() {
    return [
      {
        key: Math.random().toString(),
        title: "if", children: []
      },
      {
        key: Math.random().toString(),
        title: "else",
        children: []
      }]
  },
  compiler: ({props = {}, children}, innerBlockCompiler, value2Exp) => {
    return `if (${value2Exp(props!.exp)}){
  ${innerBlockCompiler(children![0] as SchemaBlock)} 
} else {
  ${innerBlockCompiler(children![1] as SchemaBlock)}
}`
  }
}