import {ComponentType, FC, useCallback} from "react";
import {Table, type TableColumnType} from "antd";
import {MetaSetter} from "@isc-logic-flow/types";
import {SetterName, setters} from "../index.tsx";


export const ArraySetter: FC<{
  value: Record<string, unknown>[],
  onChange: (v: Record<string, unknown>[]) => void,
  columns: { setter: MetaSetter, name: string, title: string }[]
}> = function ({columns, value, onChange}) {
  const formatColumns = useCallback(function formatColumns(columns: {
    setter: MetaSetter,
    name: string,
    title: string
  }[]): TableColumnType<Record<string, unknown>>[] {
    const res: TableColumnType<Record<string, unknown>>[] = []
    for (const column of columns) {
      res.push({
        title: column.title,
        dataIndex: column.name,
        render: (text: unknown, record: Record<string, unknown>) => {
          const Setter: ComponentType<{
            value: unknown,
            onChange: (v: unknown) => void
          }> = (typeof column.setter === "string" ? setters[column.setter as SetterName] : typeof column.setter.component === "string" ? setters[column.setter.component as SetterName] : column.setter.component as ComponentType) as ComponentType<{
            value: unknown,
            onChange: (v: unknown) => void
          }>
          return <Setter {...column.setter?.props} value={text} onChange={(v: unknown) => {
            record[column.name] = v
            onChange([...value])
          }}></Setter>
        }
      })
    }
    res.push({
      title: "操作",
      dataIndex: "operation",
      render: (_: unknown, record: Record<string, unknown>) => {
        return <>
          <a onClick={() => {
            value.splice(value.indexOf(record), 1)
            onChange([...value])
          }}>删除</a>
        </>
      }
    })
    return res
  }, [onChange]);

  const columns_ = formatColumns(columns);
  return <div style={{paddingBlock: 4}}>
    <a style={{
      marginBottom: 8,
    }} onClick={() => {
      value.push(columns.reduce((acc, column) => {
        acc[column.name] = ""
        return acc
      }, {} as Record<string, unknown>))
      onChange([...value])
    }}>添加</a>
    <Table size={"small"} columns={columns_} dataSource={value}></Table>
  </div>
}