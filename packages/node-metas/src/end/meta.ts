import {MetaNode} from "@isc-logic-flow/types";

export const end: MetaNode = {
  name: "end",
  title: "结束",
  props: [{
    name: "returnValue",
    title: "返回值",
    setter: "JSExpression"
  }],
  isEnd: true,
  compiler: ({props}, _, value2Exp) => {
    return `return ${value2Exp(props.returnValue)};`
  }
}