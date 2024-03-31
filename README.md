# 逻辑流

## 简介
这是一个通用可视化逻辑流框架，包含编译器、设计器、执行器等模块，可以用于构建逻辑流应用。该框架主要有以下特性：
* 可视化设计
* 生成代码
* 可视化调试
* 设计态和运行态分离，设计态通过设计器进行设计，执行态通过运行态进行执行
* 节点定义与其他模块无耦合，可基于当前代码自定义节点
* 设计器与其他模块无耦合，可基于当前代码自定义设计器

[demo](https://wittyna.github.io/logic-flow)
## 启动
```bash
pnpm install
npm run dev
```

## 项目结构
```
.
├── packages
│   ├── compiler        # 编译器
│   ├── designer        # 设计器
│   ├── excuter         # 执行器
│   ├── node-contexts   # 节点上下文
│   ├── node-metas      # 节点定义
│   └── node-types      # 类型定义
├── src
│   ├── App.tsx         # demo
│   ├── main.tsx        # demo 入口

```





