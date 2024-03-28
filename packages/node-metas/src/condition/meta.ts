import {MetaNode, SchemaBlock} from "@isc-logic-flow/types";

export const condition: MetaNode = {
  name: "condition",
  title: "条件",
  
  props: [{
    name: "exp",
    title: "条件表达式",
    setter: "JsExpression"
  }],
  initialChildren() {
    return [{nodes: []}, {nodes: []}]
  },
  compiler: ({props = {}, children}, innerBlockCompiler, value2Exp) => {
    return `if (${value2Exp(props!.exp)}){
  ${innerBlockCompiler(children![0] as SchemaBlock)} 
} else {
  ${innerBlockCompiler(children![1] as SchemaBlock)}
}`
  }
}