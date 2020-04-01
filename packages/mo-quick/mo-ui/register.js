import { kebabCase } from "lodash";
import Vue from "vue";

import "lqq-ui/assets/style/reset.less";
import "./plugins/element.js";
import * as ui from "./view";

// 全局注册UI组件
console.info(`start: 全局注册mo组件`);

Object.keys(ui).forEach(name => {
  const kebabName = kebabCase(`mo${name}`);
  Vue.component(kebabName, ui[name]);
  console.info(`register: ${kebabName}`);

  // 命名转换，形成text类型组件，text-plain、text-form、...
  if (name === "PlainText") {
    Vue.component("mo-text-plain", QqUi[name]);
    console.info(`register: mo-text-plain`);
  }
});

console.info(`end: mo组件注册完毕`);
