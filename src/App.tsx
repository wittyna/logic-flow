import {TreeDesigner} from "@isc-logic-flow/designer";
import {blockCompiler} from "@isc-logic-flow/compiler";
import {executor} from "@isc-logic-flow/executor";
import * as metaNodes from "@isc-logic-flow/node-metas";
import {Button, Tag} from "antd";
import {useRef, useState} from "react";
import {SchemaBlock} from "@isc-logic-flow/types";
import {allContexts} from "@isc-logic-flow/node-contexts";

function App() {
  const ref = useRef<{
    exportSchema: () => SchemaBlock;
    importSchema: (schema: SchemaBlock) => void;
  }>(null);
  const [source, setSource] = useState("")
  return (
    <div style={{height: "100vh"}}>
      <div style={{height: 50, display: "flex", alignItems: "center", paddingInline: "12px"}}><Button onClick={() => {
        const schema = ref.current!.exportSchema()
        setSource(blockCompiler(schema, metaNodes))
      }}>编译</Button></div>
      <div style={{height: "calc(50% - 25px)"}}>
        <TreeDesigner ref={ref} metas={metaNodes}>
        </TreeDesigner>
      </div>
      <div style={{height: "calc(50% - 25px)"}}>
        <div><Tag>编译后代码</Tag></div>
        <Button onClick={() => executor(source, allContexts)} style={{marginTop: "12px"}}>运行</Button>
        <pre>{source}</pre>
      </div>
    </div>
  )
}

export default App
