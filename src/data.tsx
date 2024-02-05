import {SchemaBlock} from "@isc-logic-flow/types";

export const demoSchema: SchemaBlock = {
  id: 'root',
  nodes: [
    {
      id: 'start',
      name: 'start',
      props: {
        vars: [{name: 'arr', value: {type: 'JSExpression', value: '[1, 2, 3, 4]'}}, {name: 'total', value: {type: 'JSExpression', value: '0'}}],
      },
      blocks: [],
    },
    {
      id: 'loop',
      name: 'loop',
      props: {
        array: {type: 'JSExpression', value: 'arr'},
        item: 'item',
        index: 'index'
      },
      blocks: [{
        id: 'loopBlock',
        nodes: [
          {
            id: "loop2",
            name: "loop",
            props: {
              array: {type: 'JSExpression', value: 'arr'},
              item: 'item2',
              index: 'index2'
            },
            blocks: [{
              id: 'loopBlock2',
              nodes: [{
                id: 'log2222',
                name: 'code',
                props: {
                  code: 'console.log(123123123)'
                },
                blocks: []
              }]
            }]
          },
          {
            id: 'condition',
            name: 'condition',
            props: {
              exp: {type: 'JSExpression', value: 'index % 2 === 0'}
            },
            blocks: [{
              id: 'ifBlock',
              nodes: [{
                id: 'log1',
                name: 'code',
                props: {
                  code: 'console.info("index:" + index + ", item:" + item)'
                },
                blocks: []
              }]
            }, {
              id: 'elseBlock',
              nodes: [{
                id: 'log2',
                name: 'code',
                props: {
                  code: 'console.warn("index:" + index + ", item:" + item)'
                },
                blocks: []
              }],
            }],
          }, {
            id: 'add',
            name: 'code',
            props: {
              code: 'total += item'
            },
            blocks: []
          }
        ]
      }],
    },
    {
      id: 'end',
      name: 'end',
      props: {
        returnValue: {
          type: 'JSExpression',
          value: 'total'
        }
      },
      blocks: [],
    }
  ]
}