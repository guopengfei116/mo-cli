# MO

> mo, momemt的简写，蕴义能够瞬间完成需求开发，旨在`解决`微医协作研发过程中重复相似的前端交互开发造成的资源浪费，`提升`开发效率，降低损耗。

## 功能介绍 - packages

在`packages`目录中的每一个文件夹都是一个项目，对应一个独立的`npm包`，这些包统一使用微医组织命名方式：`@weiyi/${name}`。

这些包与他们的作用如下：

### mo-quick

- 项目脚手架

### mo-quick-cli

- cli辅助工具

### mo-quick-tpl

- 代码模板仓库

### mo

- 常用工具包

### mo-ui

- UI组件包

### mo-ui-h5

- UI组件包,H5版

## 开发

安装开发依赖

```shell
npm install
```

根据开发需求修改packages下对应项目的源代码，然后使用发布命令更新npm包版本。

```shell
npm run publish
```
