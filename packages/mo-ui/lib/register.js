import { kebabCase } from "lodash";
import Vue from "vue";

import Ironman from "@weiyi/component-sdk";
import "lqq-ui/assets/style/reset.less";
import "./plugins/element.js";
import * as ui from "./view";

// 全局注册UI组件
console.info(`start: 全局注册mo组件`);

Object.keys(ui).forEach(name => {
  const kebabName = kebabCase(`mo${name}`);
  Vue.component(kebabName, ui[name]);
  console.info(`register mo component: ${kebabName}`);

  // 命名转换，形成text类型组件，text-plain、text-form、...
  if (name === "PlainText") {
    Vue.component("mo-text-plain", ui[name]);
    console.info(`register mo component: mo-text-plain`);
  }
});

// 全局注册 Ironman 组件
Object.keys(Ironman).forEach(name => {
  // copyBtn组件在内部注册时用的copyButton名称
  if (name === "copyBtn") {
    name = "copyButton";
  }

  const kebabName = kebabCase(`mo-${name}`);
  Vue.component(kebabName, Vue.component(kebabCase(name)));
  console.info(`register mo component: ${kebabName}`);
});

console.info(`end: mo组件注册完毕`);
