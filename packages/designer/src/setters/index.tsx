import {JsExpressionSetter} from "./JsExpression";
import {StringSetter} from "./String";
import {FC} from "react";
import {ArraySetter} from "./Array";


export const setters = {
  JsExpression: JsExpressionSetter as FC,
  String: StringSetter as FC,
  Array: ArraySetter as FC
}

export type SetterName = keyof typeof setters;