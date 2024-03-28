import {type TreeDataNode} from "antd";

export interface SchemaBlock extends TreeDataNode {
  children: SchemaNode[];
}

export interface SchemaNode extends TreeDataNode {
  nodeName: string;
  props: SchemaNodeProps;
  children: SchemaBlock[];
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