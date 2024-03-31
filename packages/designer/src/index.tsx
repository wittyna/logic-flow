import {createContext, forwardRef, useImperativeHandle, useMemo, useRef, useState} from "react";
import {SchemaBlock, SchemaNode} from "@isc-logic-flow/types/src/Schema.ts";
import {MetaNode} from "@isc-logic-flow/types/src/Meta.ts";
import {getInitSchema} from "./initSchema.ts";
import {Button, Dropdown, MenuProps, Tree, TreeDataNode} from "antd";
import {MetaForm} from "./MetaForm";
import {v1 as uuid} from "uuid"
import {executor} from "@isc-logic-flow/executor";
import {compiler} from "@isc-logic-flow/compiler";
import {Logs, LogsRef} from "./Logs.tsx";

export interface DesignerContextType {
  metas: Record<string, MetaNode>;
}

export const DesignerContext = createContext<DesignerContextType>({
  metas: {}
})

function isBlock(node: TreeDataNode) {
  return node && (node as SchemaNode)?.nodeName === undefined
}

function isNode(node: TreeDataNode) {
  return node && !isBlock(node)
}

export interface DebugObj {
  next: () => Promise<{
    done: boolean;
    value: string;
  }>;
  stop: () => void;
}

export interface TreeDesignerRef {
  exportSchema: () => SchemaBlock;
  importSchema: (schema: SchemaBlock) => void;
  startDebugger: () => DebugObj;
}

export const TreeDesigner = forwardRef<TreeDesignerRef, {
  metas: Record<string, MetaNode>;
  initialSchema?: SchemaBlock;
}>(({metas, initialSchema = getInitSchema()}, ref) => {
  const [schema, setSchema] = useState(() => {
    return initialSchema
  })
  const [key, setKey] = useState(0)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(() => {
    const res: React.Key[] = []

    function walk(node: SchemaNode | SchemaBlock) {
      res.push(node.key as string)
      if (node.children) {
        node.children.forEach(walk)
      }
    }

    walk(schema)
    return res
  });
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

  const [selectedNode, setSelectedNode] = useState<SchemaNode | null>(null)
  const [currentDebugNodeKey, setCurrentDebugNodeKey] = useState("")
  const [debugObj, setDebugObj] = useState<DebugObj | null>(null)
  const logsRef = useRef<LogsRef>(null)
  useImperativeHandle(ref, () => {
    return {
      exportSchema: () => {
        return schema
      },
      importSchema: (schema: SchemaBlock) => {
        setSchema(schema)
      },
      startDebugger: () => {
        if (debugObj) {
          return debugObj
        }
        const debugObj_: DebugObj = executor(compiler(schema, metas, true), {
          console: {
            log: (str: string) => {
              logsRef.current?.log(str)
            }
          }
        }, [], true)
        setDebugObj(debugObj_)
        return {
          async next() {
            const {done, value} = await debugObj_.next()
            if (done) {
              setCurrentDebugNodeKey("")
              setDebugObj(null)
            } else {
              setCurrentDebugNodeKey(value)
            }
            return {done, value}
          },
          stop() {
            setCurrentDebugNodeKey("")
            setDebugObj(null)
          }
        }
      }
    }
  }, [schema, debugObj])
  const createNewNodeButton = (parent: SchemaBlock) => {
    return <Dropdown menu={{
      items: Object.values(metas).map((meta) => {
        return {
          key: meta.name,
          label: meta.title,
          onClick: () => {
            const props = meta.initialProps?.() || {}
            const newNode: SchemaNode = {
              key: uuid(),
              title: meta.title as string,
              nodeName: meta.name,
              props,
              children: meta.initialChildren?.(props) || []
            }
            parent.children.push(newNode)
            setSchema({...schema})
            setKey(key + 1)
          }
        }
      }) as MenuProps["items"]
    }}>
      <Button type={"link"} onClick={e => {
        e.stopPropagation()
      }} size={"small"}>新增</Button>
    </Dropdown>
  }
  return <div style={{display: "flex", border: "1px solid #ddd", height: "100%", padding: 8, boxSizing: "border-box"}}>
    <div style={{height: "100%", overflowY: "auto"}}>
      {!debugObj ? createNewNodeButton(schema) : null}
      <Tree
        key={key}
        style={{width: 300}}
        expandedKeys={expandedKeys}
        onExpand={(keys) => {
          setExpandedKeys(keys)
        }}
        treeData={schema.children as unknown as TreeDataNode[]}
        draggable={(node) => {
          return !debugObj && isNode(node)
        }}
        allowDrop={({dropNode}) => {
          return isBlock(dropNode)
        }}
        onDrop={(info) => {
          const dropKey = info.node.key;
          const dragKey = info.dragNode.key;
          const dropPos = info.node.pos.split("-");
          const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

          const loop = (
            data: TreeDataNode[],
            key: React.Key,
            callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
          ) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].key === key) {
                return callback(data[i], i, data);
              }
              if (data[i].children) {
                loop(data[i].children!, key, callback);
              }
            }
          };
          const data = [...schema.children];

          // Find dragObject
          let dragObj: TreeDataNode;
          loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
          });

          if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
              item.children = item.children || [];
              // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
              item.children.unshift(dragObj);
            });
          } else {
            let ar: TreeDataNode[] = [];
            let i: number;
            loop(data, dropKey, (_item, index, arr) => {
              ar = arr;
              i = index;
            });
            if (dropPosition === -1) {
              // Drop on the top of the drop node
              ar.splice(i!, 0, dragObj!);
            } else {
              // Drop on the bottom of the drop node
              ar.splice(i! + 1, 0, dragObj!);
            }
          }
          setSchema({...schema, children: [...data]});
        }}
        selectedKeys={selectedNode?.key ? [selectedNode.key] : []}
        onSelect={(_, {node}) => {
          // 必须是SchemaNode才能编辑
          if (isNode(node)) {
            setSelectedNode(node as unknown as SchemaNode)
          }
        }} titleRender={(node) => {
        return <div style={{color: isNode(node) ? "unset" : "#999", display: "flex", alignItems: "center"}}>
          {currentDebugNodeKey === node.key ?
            <div style={{width: 10, height: 10, borderRadius: 5, background: "red", marginRight: 4}}></div> : null}
          <span>{(node.title || (node as unknown as { name: string }).name) as string}</span>
          {!debugObj ? isBlock(node) ? createNewNodeButton(schemaKey2Node[node.key as string] as SchemaBlock) :
            <Button type={"text"} size={"small"} onClick={(event) => {
              event.stopPropagation()
              const parent = schemaKey2Parent[node.key as string] as SchemaBlock
              parent.children = parent.children.filter(one => one.key !== node.key)
              setSchema({...schema})
              if (node.key === selectedNode?.key) {
                setSelectedNode(null)
              }
              setKey(key + 1)
            }} danger>删除</Button> : null}

        </div>
      }
      }>
      </Tree>
    </div>
    <div style={{flex: 1, borderLeft: "1px solid #ddd", padding: 8}}>
      {debugObj ? <Logs ref={logsRef}></Logs> : selectedNode ?
        <MetaForm key={selectedNode?.key || 0} nodeMeta={metas[selectedNode.nodeName]} nodeKey={selectedNode.nodeName}
                  value={selectedNode.props}
                  onChange={value => {
                    (schemaKey2Node[selectedNode.key as string] as SchemaNode).props = value
                  }}>

        </MetaForm> : null}
    </div>
  </div>
})
