import {createContext, forwardRef, useImperativeHandle, useState} from "react";
import {SchemaBlock, SchemaNode} from "@isc-logic-flow/types/src/Schema.ts";
import {MetaNode} from "@isc-logic-flow/types/src/Meta.ts";
import {getInitSchema} from "./initSchema.ts";
import {Button, Tree, TreeDataNode} from "antd";
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
  return <div style={{display: "flex", border: "1px solid #ddd", height: "100%", padding: 8, boxSizing: "border-box"}}>
    <div style={{height: "100%", overflowY: "auto"}}>
      <Button style={{marginBottom: 8}} size={"small"}>新增节点</Button>
      <Tree style={{width: 300}}
            treeData={schema.children as unknown as TreeDataNode[]}
            selectedKeys={selectedNode?.key ? [selectedNode.key] : []}
            onSelect={(_, {node}) => {
              // 必须是SchemaNode才能编辑
              if ((node as unknown as SchemaNode).nodeName) {
                setSelectedNode(node as unknown as SchemaNode)
              }
            }} titleRender={(node) => {
        return <>{node.title || (node as unknown as { name: string }).name}</>
      }}>
      </Tree>
    </div>
    <div style={{flex: 1, borderLeft: "1px solid #ddd", padding: 8}}>
      {selectedNode ?
        <MetaForm nodeMeta={metas[selectedNode.nodeName]} nodeKey={selectedNode.nodeName} value={selectedNode.props}
                  onChange={value => {
                    selectedNode.props = value
                  }}></MetaForm> : null}
    </div>
  </div>
})
