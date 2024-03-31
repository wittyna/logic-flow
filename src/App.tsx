import {DebugObj, TreeDesigner, TreeDesignerRef} from "@isc-logic-flow/designer";
import {compiler} from "@isc-logic-flow/compiler";
import * as metaNodes from "@isc-logic-flow/node-metas";
import {Button, Tag} from "antd";
import {useEffect, useRef, useState} from "react";
import {demoSchema} from "./demoSchema.ts";

function App() {
  const ref = useRef<TreeDesignerRef>(null);
  const [source, setSource] = useState("")
  const [debugObj, setDebugObj] = useState<DebugObj | null>(null)
  const [schema, setSchema] = useState("")
  useEffect(() => {
    const i = setInterval(() => {
      if (ref.current) {
        const schema_ = ref.current.exportSchema()
        setSchema(JSON.stringify(schema_, null, 2))
        setSource(compiler(schema_, metaNodes))
      }
    }, 1500)
    return () => {
      clearInterval(i)
    }
  }, []);
  return <div style={{height: "100vh"}}>
    <div style={{height: 50, display: "flex", alignItems: "center", paddingInline: "12px"}}>
      {debugObj ? <><Button style={{marginRight: 8}} onClick={() => {
        debugObj.next().then((d) => {
          if (d.done) {
            setDebugObj(null)
          }
        })
      }}>下一步</Button>
        <Button style={{marginRight: 8}} onClick={() => {
          debugObj?.stop()
          setDebugObj(null)
        }}>结束调试</Button></> : <Button style={{marginRight: 8}} onClick={() => {
        setDebugObj(ref.current!.startDebugger())
      }}>调试</Button>}
    </div>
    <div style={{height: "calc(50% - 25px)"}}>
      <TreeDesigner ref={ref} metas={metaNodes} initialSchema={demoSchema}>
      </TreeDesigner>
    </div>
    <div style={{height: "calc(50% - 25px)", display: "flex"}}>
      <div style={{
        borderRight: "1px solid #ddd",
        boxSizing: "border-box",
        height: "100%",
        width: "50%",
        overflowY: "auto"
      }}>
        <Tag>schema</Tag>
        <pre>{schema}</pre>
      </div>
      <div style={{height: "100%", width: "50%"}}>
        <Tag>source</Tag>
        <pre>{source}</pre>
      </div>
    </div>
  </div>
}

export default App
