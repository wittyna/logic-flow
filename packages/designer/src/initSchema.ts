import {SchemaBlock} from "@isc-logic-flow/types";

export function getInitSchema(): SchemaBlock {
  return {
    key: "root",
    children: [
      {
        key: "start",
        nodeName: "start",
        title: "开始",
        props: {
          vars: []
        },
        children: [],
      },
      {
        key: "end",
        title: "结束",
        nodeName: "end",
        props: {
          vars: []
        },
        children: [],
      }
    ]
  }
}