import {forwardRef} from "react";
import {SchemaBlock} from "@isc-logic-flow/types/src/Schema.ts";
import {MetaNode} from "@isc-logic-flow/types/src/Meta.ts";

export const DiagramDesigner = forwardRef<{
  exportSchema: () => SchemaBlock;
  importSchema: (schema: SchemaBlock) => void;
}, {
  metaNodes: MetaNode[];
}>(() => {
  return null
})