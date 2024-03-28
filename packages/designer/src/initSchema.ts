import {SchemaBlock} from "@isc-logic-flow/types";

export function getInitSchema(): SchemaBlock {
  return {
    key: "root",
    children: [
      {
        key: "start",
        nodeName: "start",
        props: {},
        children: [],
      },
      {
        key: "end",
        nodeName: "end",
        props: {},
        children: [],
      }
    ]
  }
}