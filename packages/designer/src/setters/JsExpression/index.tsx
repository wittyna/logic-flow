import {FC, useEffect} from "react";
import {Input} from "antd";

export const JsExpressionSetter: FC<{
  value?: { type: "JsExpression", value: string },
  onChange: (v: { type: "JsExpression", value: string }) => void
}> = function (props) {
  useEffect(() => {
    if (!props.value) {
      props.onChange({type: "JsExpression", value: ""});
    }
  }, []);
  return <Input prefix={<span style={{color: "#aaa"}}>{"{{"}</span>}
                suffix={<span style={{color: "#aaa"}}>{"}}"}</span>}
                value={props.value?.value}
                onChange={(e) => props.onChange({type: "JsExpression", value: e.target.value})}/>
}