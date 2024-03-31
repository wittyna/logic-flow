import {MetaNode, SchemaBlock} from "@isc-logic-flow/types";
import {v1 as uuid} from "uuid"


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
        key: uuid(),
        title: "if", children: []
      },
      {
        key: uuid(),
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