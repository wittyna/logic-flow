import {forwardRef, useImperativeHandle, useState} from "react";
import {Tag} from "antd";

export interface LogsRef {
  log: (str: string) => void;
}

export const Logs = forwardRef<LogsRef>(function (_props, ref) {
  const [logs, setLogs] = useState("")
  useImperativeHandle(ref, () => {
    return {
      log: (str) => {
        setLogs(logs + str + "\n")
      }
    }
  });
  return (
    <div>
      <Tag>控制台日志</Tag>
      <pre>{logs}</pre>
    </div>
  );
})