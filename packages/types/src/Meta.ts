import {type ReactElement, type ComponentType} from "React";
import {RuntimeNodeProps} from "./Runtime.ts";
import {SchemaBlock, SchemaNode, SchemaNodeProps, SchemaValue} from "./Schema.ts";
import {InnerBlockCompiler} from "./Compiler.ts";

export interface MetaNode {
  name: string;
  title: ReactElement | ((props: RuntimeNodeProps) => ReactElement) | string;
  shape?: ReactElement | string;
  props: MetaNodeProp[];
  initialProps?: (() => SchemaNodeProps);
  // 编译器
  compiler: (schemaNode: SchemaNode, compiler: InnerBlockCompiler, value2Exp: (schemaValue: SchemaValue) => string) => string;
  isStart?: boolean;
  isEnd?: boolean;
  initialChildren?: ((props: RuntimeNodeProps) => SchemaBlock[]);
  blocksEndNode?: MetaNode;
}

export interface MetaNodeProp {
  name: string;
  title: string;
  setter: MetaSetter | string;
}

export interface MetaSetter {
  component: ComponentType | string;
  props: {
    [key: string]: unknown;
  };
}