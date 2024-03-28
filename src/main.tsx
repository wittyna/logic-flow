// import * as metas from '../packages/node-metas/src/metas.ts'
// import {blockCompiler} from '@isc-logic-flow/compiler'
// import {executor} from "@isc-logic-flow/executor";
// import {allContexts} from "@isc-logic-flow/node-contexts";
//
// import {demoSchema} from "./data.tsx";
//
//
// console.log(metas, 111)
// const code = blockCompiler(demoSchema, metas)
// console.log(code, 111)
// const res = executor(code, {...allContexts, this: {}}, [])
// console.log(res, 111)


import ReactDOM from "react-dom/client"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App/>
)
