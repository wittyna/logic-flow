import {MetaNode} from "@isc-logic-flow/types";

export const code: MetaNode = {
  name: 'code',
  title: "代码",
  props: [{
    name: 'code',
    title: '代码',
    setter: 'string'
  }],
  compiler: ({props = {}}) => {
    return "await " + props.code + ';';
  }
}