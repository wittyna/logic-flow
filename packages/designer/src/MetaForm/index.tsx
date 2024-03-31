import {FC} from "react";
import {MetaNode, SchemaNodeProps} from "@isc-logic-flow/types";
import {Form} from "antd";
import {SetterName, setters} from "../setters";
import {ComponentType} from "React";

export const MetaForm: FC<{
  nodeMeta: MetaNode,
  nodeKey: string,
  value: SchemaNodeProps
  onChange: (v: SchemaNodeProps) => void
}> = ({nodeMeta, value = {}, onChange, nodeKey}) => {
  const [form] = Form.useForm()
  return <Form form={form} initialValues={value} onChange={() => {
    onChange(form.getFieldsValue())
  }} key={nodeKey}>
    {nodeMeta.props.map(prop => {
      const Setter = typeof prop.setter === "string" ? setters[prop.setter as SetterName] : typeof prop.setter.component === "string" ? setters[prop.setter.component as SetterName] : prop.setter.component as ComponentType
      const SetterProps = typeof prop.setter === "string" ? {} : prop.setter.props
      return <Form.Item key={prop.name} label={prop.title} name={prop.name}>
        <Setter {...SetterProps}/>
      </Form.Item>
    })}
  </Form>
}