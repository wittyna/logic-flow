import {MetaNode} from "@isc-logic-flow/types";

export const start: MetaNode = {
  name: "start",
  title: "开始",

  props: [{
    name: "vars",
    title: "变量定义",
    setter: {
      component: "Array",
      props: {
        columns: [{
          title: "变量名",
          name: "name",
          setter: "String"
        }, {
          title: "初始值",
          name: "value",
          setter: "JsExpression"
        }]
      }
    }
  }],
  initialProps() {
    return {
      vars: []
    }
  },
  isStart: true,
  compiler: ({props}, _innerBlockCompiler, value2Exp) => {
    return (props as {
      vars: {
        name: string,
        value: string
      }[]
    }).vars.reduce((previousValue, currentValue, currentIndex, array) => {
      return `${previousValue}${currentValue.name}=${value2Exp(currentValue.value)};${currentIndex !== array.length - 1 ? "\n" : ""}`
    }, "")
  }
}