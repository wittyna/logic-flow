import {FC} from "react";
import {Switch} from "antd";


export const BooleanSetter: FC<{ value: boolean, onChange: (v: boolean) => void }> = function (props) {
  return <Switch value={props.value} onChange={(e) => props.onChange(e)}/>
}