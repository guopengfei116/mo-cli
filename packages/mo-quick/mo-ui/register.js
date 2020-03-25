import { kebabCase } from "lodash";
import Vue from "vue";
import "./plugins/element.js";

import "lqq-ui/assets/style/reset.less";
import * as ui from "./view";

// 全局注册UI组件
console.info(`start: 全局注册mo组件`);
Object.keys(ui).forEach(name => {
  const kebabName = kebabCase(`mo${name}`);
  Vue.component(kebabName, ui[name]);
  console.info(`register: ${kebabName}`);
});
console.info(`end: mo组件注册完毕`);
