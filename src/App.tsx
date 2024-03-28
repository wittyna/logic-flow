import {TreeDesigner} from "@isc-logic-flow/designer";
import {blockCompiler} from "@isc-logic-flow/compiler";
import * as metaNodes from "@isc-logic-flow/node-metas";
import {demoSchema} from "./data.tsx";
import {Button, Tag} from "antd";
import {useRef, useState} from "react";
import {SchemaBlock} from "@isc-logic-flow/types";

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
        <TreeDesigner ref={ref} metas={metaNodes} initialSchema={demoSchema}>
        </TreeDesigner>
      </div>
      <div style={{height: "calc(50% - 25px)"}}>
        <div><Tag>编译后代码</Tag></div>
        <pre>{source}</pre>
      </div>
    </div>
  )
}

export default App
