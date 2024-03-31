import {SchemaBlock} from "@isc-logic-flow/types";

export const demoSchema: SchemaBlock = {
  "key": "root",
  "children": [
    {
      "key": "201dcda0-ef6a-11ee-a1a4-ad3a0768dcad",
      "title": "变量定义",
      "nodeName": "vars",
      "props": {
        "vars": [
          {
            "name": "arr",
            "value": {
              "type": "JSExpression",
              "value": "[1,2,3,4]"
            }
          }
        ]
      },
      "children": []
    },
    {
      "key": "29d43910-ef6a-11ee-a1a4-ad3a0768dcad",
      "title": "循环",
      "nodeName": "loop",
      "props": {
        "array": {
          "type": "JSExpression",
          "value": "arr"
        },
        "item": "item",
        "index": "index"
      },
      "children": [
        {
          "key": "29d43911-ef6a-11ee-a1a4-ad3a0768dcad",
          "title": "循环体",
          "children": [
            {
              "key": "2ecc0b00-ef6a-11ee-a1a4-ad3a0768dcad",
              "title": "条件",
              "nodeName": "condition",
              "props": {
                "exp": {
                  "type": "JSExpression",
                  "value": "item %2 === 0"
                }
              },
              "children": [
                {
                  "key": "2ecc0b01-ef6a-11ee-a1a4-ad3a0768dcad",
                  "title": "if",
                  "children": [
                    {
                      "key": "473f0bb0-ef6a-11ee-a1a4-ad3a0768dcad",
                      "title": "代码",
                      "nodeName": "code",
                      "props": {
                        "code": {
                          "type": "JSExpression",
                          "value": "console.log(\"偶数\")"
                        }
                      },
                      "children": [
                        {
                          "key": "473f32c0-ef6a-11ee-a1a4-ad3a0768dcad",
                          "title": "错误捕捉",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "key": "2ecc0b02-ef6a-11ee-a1a4-ad3a0768dcad",
                  "title": "else",
                  "children": [
                    {
                      "key": "5938ca90-ef6a-11ee-a1a4-ad3a0768dcad",
                      "title": "代码",
                      "nodeName": "code",
                      "props": {
                        "code": {
                          "type": "JSExpression",
                          "value": "console.log(\"奇数\")"
                        }
                      },
                      "children": [
                        {
                          "key": "5938ca91-ef6a-11ee-a1a4-ad3a0768dcad",
                          "title": "错误捕捉",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}