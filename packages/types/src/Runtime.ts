export interface RuntimeNodeProps {
  [key: string]: RuntimeNodePropsValue;
}

// 运行时执行node所需上下文
export interface RuntimeNodeContext {
  [key: string]: unknown;
}

export type RuntimeNodePropsValue = string | number | boolean | object | null | undefined;