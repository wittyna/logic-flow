import {createContext, forwardRef, useImperativeHandle, useMemo, useState} from "react";
import {SchemaBlock, SchemaNode} from "@isc-logic-flow/types/src/Schema.ts";
import {MetaNode} from "@isc-logic-flow/types/src/Meta.ts";
import {getInitSchema} from "./initSchema.ts";
import {Button, Dropdown, MenuProps, Tree, TreeDataNode} from "antd";
import {MetaForm} from "./MetaForm";


export interface DesignerContextType {
  metas: Record<string, MetaNode>;
}

export const DesignerContext = createContext<DesignerContextType>({
  metas: {}
})

export const TreeDesigner = forwardRef<{
  exportSchema: () => SchemaBlock;
  importSchema: (schema: SchemaBlock) => void;
}, {
  metas: Record<string, MetaNode>;
  initialSchema?: SchemaBlock;
}>(({metas, initialSchema = getInitSchema()}, ref) => {
  const [schema, setSchema] = useState(() => {
    return initialSchema
  })
  const [key, setKey] = useState(0)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const schemaKey2Node = useMemo(() => {
    const res: Record<string, SchemaNode | SchemaBlock> = {}

    function walk(node: SchemaNode | SchemaBlock) {
      res[node.key as string] = node
      if (node.children) {
        node.children.forEach(walk)
      }
    }

    walk(schema)
    return res

  }, [schema]);

  const schemaKey2Parent = useMemo(() => {
    const res: Record<string, SchemaNode | SchemaBlock> = {}

    function walk(node: SchemaNode | SchemaBlock) {
      if (node.children) {
        node.children.forEach(child => {
          res[child.key as string] = node
          walk(child)
        })
      }
    }

    walk(schema)
    return res

  }, [schema]);

  const [selectedNode, setSelectedNode] = useState<SchemaNode>()
  useImperativeHandle(ref, () => {
    return {
      exportSchema: () => {
        return schema
      },
      importSchema: (schema: SchemaBlock) => {
        setSchema(schema)
      }
    }
  }, [schema])
  const createNewNodeButton = (parent: SchemaBlock) => {
    return <Dropdown menu={{
      items: Object.values(metas).filter(one => !["start", "end"].includes(one.name)).map((meta) => {
        return {
          key: meta.name,
          label: meta.title,
          onClick: () => {
            const props = meta.initialProps?.() || {}
            const newNode: SchemaNode = {
              key: Math.random().toString(),
              title: <>{meta.title}</>,
              nodeName: meta.name,
              props,
              children: meta.initialChildren?.(props) || []
            }
            if (parent.key === "root") {
              parent.children.splice(-1, 0, newNode)
            } else {
              parent.children.push(newNode)
            }
            setKey(key + 1)
          }
        }
      }) as MenuProps["items"]
    }}>
      <Button type={"link"} style={{marginBottom: 8}} size={"small"}>新增</Button>
    </Dropdown>
  }
  return <div style={{display: "flex", border: "1px solid #ddd", height: "100%", padding: 8, boxSizing: "border-box"}}>
    <div style={{height: "100%", overflowY: "auto"}}>
      {createNewNodeButton(schema)}
      <Tree
        key={key}
        style={{width: 300}}
        expandedKeys={expandedKeys}
        onExpand={(keys) => {
          setExpandedKeys(keys)
        }}
        treeData={schema.children as unknown as TreeDataNode[]}
        selectedKeys={selectedNode?.key ? [selectedNode.key] : []}
        onSelect={(_, {node}) => {
          // 必须是SchemaNode才能编辑
          if ((node as unknown as SchemaNode).nodeName) {
            setSelectedNode(node as unknown as SchemaNode)
          }
        }} titleRender={(node) => {
        return <div>
          <span>{(node.title || (node as unknown as { name: string }).name) as string}</span>
          {!(node as SchemaNode).nodeName ? createNewNodeButton(schemaKey2Node[node.key as string] as SchemaBlock) : null}
          <Button type={"text"} style={{marginBottom: 8}} size={"small"} onClick={() => {
            const parent = schemaKey2Parent[node.key as string] as SchemaBlock
            parent.children = parent.children.filter(one => one.key !== node.key)
            setKey(key + 1)
          }} danger>删除</Button>
        </div>
      }}>
      </Tree>
    </div>
    <div style={{flex: 1, borderLeft: "1px solid #ddd", padding: 8}}>
      {selectedNode ?
        <MetaForm nodeMeta={metas[selectedNode.nodeName]} nodeKey={selectedNode.nodeName} value={selectedNode.props}
                  onChange={value => {
                    (schemaKey2Node[selectedNode.key as string] as SchemaNode).props = value
                  }}></MetaForm> : null}
    </div>
  </div>
})
