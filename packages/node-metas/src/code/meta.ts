import {MetaNode} from "@isc-logic-flow/types";

export const code: MetaNode = {
  name: "code",
  title: "代码",
  props: [{
    name: "code",
    title: "代码",
    setter: "String"
  }, {
    name: "await",
    title: "await",
    setter: "Boolean"
  }],
  compiler: ({props = {}}) => {
    return `${props.await ? "await" : ""} ${props.code};`;
  }
}