import {BlockCompiler, SchemaSpecialValue, SchemaValue} from "@isc-logic-flow/types";
import {trimEnd} from "lodash-es";

export function value2exp(value: SchemaValue) {
  if ((value as SchemaSpecialValue)?.type === "JSExpression") {
    let v = (value as SchemaSpecialValue).value?.replace(/\/\/.*/g, '').trim();
    if (v.endsWith(';')) {
      v = trimEnd(v, ';');
    }
    return v
  }
  return `${JSON.stringify(value)}`;
}

function addStrEveryLine(code: string, str: string) {
  return code.split('\n').map((line) => str + line).join('\n');
}

export const blockCompiler: BlockCompiler = (schemaBlock, nodeMetas) => {
  let res = '';
  for (const node of schemaBlock.nodes) {
    if (!nodeMetas[node.name]) {
      throw new Error(`NodeMeta not found for node: ${node.name}`);
    }
    res += nodeMetas[node.name].compiler(node, (schemaBlock) => addStrEveryLine(blockCompiler(schemaBlock, nodeMetas), "  "), value2exp);
    if (node !== schemaBlock.nodes[schemaBlock.nodes.length - 1]) {
      res += '\n';
    }
  }
  return res
}

