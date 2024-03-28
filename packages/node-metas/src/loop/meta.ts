import {MetaNode} from "@isc-logic-flow/types";

export const loop: MetaNode = {
  name: "loop",
  title: "循环",

  props: [{
    name: "array",
    title: "循环数组",
    setter: "JsExpression"
  }, {
    name: "item",
    title: "item变量名",
    setter: "String"
  }, {
    name: "index",
    title: "index变量名",
    setter: "String"
  }],
  initialChildren() {
    return [{
      key: Math.random().toString(),
      title: "循环体",
      children: []
    }]
  },
  initialProps() {
    return {
      item: "item",
      index: "index",
      array: []
    }
  },
  compiler: ({props = {}, children = []}, innerBlockCompiler, value2Exp) => {
    return `for (let ${props.index}=0, __array__=${value2Exp(props.array)}; ${props.index}<__array__.length; ${props.index}++) {
  ${props.item} = __array__[${props.index}];
${innerBlockCompiler(children[0])}
}`
  }
}