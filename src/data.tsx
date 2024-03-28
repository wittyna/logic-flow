import {SchemaBlock} from "@isc-logic-flow/types";

export const demoSchema: SchemaBlock = {
  key: "root",
  children: [
    {
      key: "start",
      title: "开始",
      nodeName: "start",
      props: {
        vars: [{name: "arr", value: {type: "JSExpression", value: "[1, 2, 3, 4]"}}, {
          name: "total",
          value: {type: "JSExpression", value: "0"}
        }],
      },
      children: [],
    },
    {
      key: "loop",
      nodeName: "loop",
      title: "循环",
      props: {
        array: {type: "JSExpression", value: "arr"},
        item: "item",
        index: "index"
      },
      children: [{
        key: "loopBlock",
        title: "循环体",
        children: [
          {
            key: "condition",
            nodeName: "condition",
            title: "条件",
            props: {
              exp: {type: "JSExpression", value: "index % 2 === 0"}
            },
            children: [{
              key: "ifBlock",
              title: "if",
              children: [{
                key: "log1",
                nodeName: "code",
                title: "代码",
                props: {
                  code: "console.info(\"index:\" + index + \", item:\" + item)"
                },
                children: []
              }]
            }, {
              key: "elseBlock",
              title: "else",
              children: [{
                key: "log2",
                nodeName: "code",
                title: "代码",
                props: {
                  code: "console.warn(\"index:\" + index + \", item:\" + item)"
                },
                children: []
              }],
            }],
          }, {
            key: "add",
            nodeName: "code",
            title: "代码",
            props: {
              code: "total += item"
            },
            children: []
          }
        ],
      }]
    },
    {
      key: "end",
      nodeName: "end",
      title: "结束",
      props: {
        returnValue: {
          type: "JSExpression",
          value: "total"
        }
      },
      children: [],
    }
  ]
}