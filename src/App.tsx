import {DebugObj, TreeDesigner, TreeDesignerRef} from "@isc-logic-flow/designer";
import {compiler} from "@isc-logic-flow/compiler";
import {executor} from "@isc-logic-flow/executor";
import * as metaNodes from "@isc-logic-flow/node-metas";
import {Button, Tag} from "antd";
import {useRef, useState} from "react";
import {allContexts} from "@isc-logic-flow/node-contexts";

function App() {
  const ref = useRef<TreeDesignerRef>(null);
  const [source, setSource] = useState("")
  const [debugObj, setDebugObj] = useState<DebugObj | null>(null)
  return <div style={{height: "100vh"}}>
    <div style={{height: 50, display: "flex", alignItems: "center", paddingInline: "12px"}}>
      <Button style={{marginRight: 8}} onClick={() => {
        const schema = ref.current!.exportSchema()
        setSource(compiler(schema, metaNodes))
      }}>编译</Button>
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
      <TreeDesigner ref={ref} metas={metaNodes}>
      </TreeDesigner>
    </div>
    <div style={{height: "calc(50% - 25px)"}}>
      <div><Tag>编译后代码</Tag></div>
      <Button onClick={() => executor(source, allContexts)}
              style={{marginTop: "12px"}}>运行</Button>
      <pre>{source}</pre>
    </div>
  </div>
}

export default App
