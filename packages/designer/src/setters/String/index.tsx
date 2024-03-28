import {FC} from "react";
import {Input} from "antd";


export const StringSetter: FC<{ value: string, onChange: (v: string) => void }> = function (props) {
  return <Input value={props.value} onChange={(e) => props.onChange(e.target.value)}/>
}