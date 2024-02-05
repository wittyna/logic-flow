export interface SchemaBlock {
  id: string;
  nodes: SchemaNode[];
}

export interface SchemaNode {
  id: string;
  name: string;
  props: SchemaNodeProps;
  blocks: SchemaBlock[];
}

export type SchemaValueBase = string | number | boolean | SchemaSpecialValue;
export type SchemaValue =
  SchemaValueBase
  | SchemaValueBase[]
  | Record<string, SchemaValueBase>
  | Record<string, SchemaValueBase>[];

export interface SchemaSpecialValue {
  type: "JSExpression";
  value: string;
}

export type SchemaNodeProps = Record<string, SchemaValue>