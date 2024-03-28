import {FC, useEffect} from "react";
import {Input} from "antd";

export const JsExpressionSetter: FC<{
  value?: { type: "JSExpression", value: string },
  onChange: (v: { type: "JSExpression", value: string }) => void
}> = function (props) {
  useEffect(() => {
    if (!props.value) {
      props.onChange({type: "JSExpression", value: ""});
    }
  }, []);
  return <Input prefix={<span style={{color: "#aaa"}}>{"{{"}</span>}
                suffix={<span style={{color: "#aaa"}}>{"}}"}</span>}
                value={props.value?.value}
                onChange={(e) => props.onChange({type: "JSExpression", value: e.target.value})}/>
}