import {JsExpressionSetter} from "./JSExpression";
import {StringSetter} from "./String";
import {FC} from "react";
import {ArraySetter} from "./Array";
import {BooleanSetter} from "./Boolean";


export const setters = {
  JSExpression: JsExpressionSetter as FC,
  String: StringSetter as FC,
  Array: ArraySetter as FC,
  Boolean: BooleanSetter as FC
}

export type SetterName = keyof typeof setters;