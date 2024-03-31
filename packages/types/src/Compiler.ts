import {SchemaBlock} from "./Schema.ts";
import {MetaNode} from "./Meta.ts";

export interface BlockCompiler {
  (schema: SchemaBlock, nodeMetas: Record<string, MetaNode>, debug?: boolean, isRoot?: boolean): string;
}

export interface InnerBlockCompiler {
  (schema: SchemaBlock): string;
}