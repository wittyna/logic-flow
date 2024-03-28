import {MetaNode} from "@isc-logic-flow/types";

export const code: MetaNode = {
  name: "code",
  title: "代码",
  props: [{
    name: "code",
    title: "代码",
    setter: "JSExpression"
  }, {
    name: "await",
    title: "await",
    setter: "Boolean"
  }],
  initialChildren() {
    return [{
      key: Math.random().toString(),
      title: "运行错误情况",
      children: []
    }]
  },
  compiler: ({props = {}, children}, compiler, value2Exp) => {
    if (children?.[0]?.children?.length) {
      return `try {
  ${props.await ? "await" : " "}${value2Exp(props.code)};
    } catch (e) {
${compiler(children[0])}
}`
    }
    return `${props.await ? "await" : " "}${value2Exp(props.code)};`;
  }
}