import {SchemaBlock} from "@isc-logic-flow/types";

export const demoSchema: SchemaBlock = {
  key: "root",
  children: [
    {
      key: "start",
      title: "start",
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
      title: "loop",
      props: {
        array: {type: "JSExpression", value: "arr"},
        item: "item",
        index: "index"
      },
      children: [{
        key: "loopBlock",
        title: "loopBlock",
        children: [
          {
            key: "loop2",
            nodeName: "loop",
            title: "loop",
            props: {
              array: {type: "JSExpression", value: "arr"},
              item: "item2",
              index: "index2"
            },
            children: [{
              key: "loopBlock2",
              title: "loopBlock",
              children: [{
                key: "log2222",
                title: "code",
                nodeName: "code",
                props: {
                  code: "console.log(123123123)"
                },
                children: []
              }]
            }]
          },
          {
            key: "condition",
            nodeName: "condition",
            title: "condition",
            props: {
              exp: {type: "JSExpression", value: "index % 2 === 0"}
            },
            children: [{
              key: "ifBlock",
              title: "if",
              children: [{
                key: "log1",
                nodeName: "code",
                title: "code",
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
                title: "code",
                props: {
                  code: "console.warn(\"index:\" + index + \", item:\" + item)"
                },
                children: []
              }],
            }],
          }, {
            key: "add",
            nodeName: "code",
            title: "code",
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
      title: "end",
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