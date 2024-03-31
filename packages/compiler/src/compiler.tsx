import {BlockCompiler, SchemaSpecialValue, SchemaValue} from "@isc-logic-flow/types";
import {trimEnd} from "lodash-es";

export function value2exp(value: SchemaValue) {
  if ((value as SchemaSpecialValue)?.type === "JSExpression") {
    let v = (value as SchemaSpecialValue).value?.replace(/\/\/.*/g, "").trim();
    if (v.endsWith(";")) {
      v = trimEnd(v, ";");
    }
    return v
  }
  return `${value || ""}`;
}

function addStrEveryLine(code: string, str: string) {
  return code.split("\n").map((line) => str + line).join("\n");
}

export const compiler: BlockCompiler = (schemaBlock, nodeMetas, debug?: boolean, isRoot = true) => {
  let res = "";
  if (debug && isRoot) {
    res += "try{\n"
  }
  for (const node of schemaBlock.children) {
    if (!nodeMetas[node.nodeName]) {
      throw new Error(`NodeMeta not found for node: ${node.nodeName}`);
    }
    if (debug) {
      res += `yield "${node.key}";\n`
    }
    res += nodeMetas[node.nodeName].compiler(node, (schemaBlock) => addStrEveryLine(compiler(schemaBlock, nodeMetas, debug, false), "  "), value2exp);
    if (node !== schemaBlock.children[schemaBlock.children.length - 1]) {
      res += "\n";
    }
  }
  if (debug && isRoot) {
    res += `} catch(e) {
  console.log(e)
}`
  }
  return res
}

