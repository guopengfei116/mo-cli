import { overwrite } from "mo/object";

import ModuleMain from "@/crud/view/Main";
import SearchModel from "@/crud/model/vo/Search";

const routes = [
  /* 模块根路由 */
  {
    // 模块根路径
    path: "/crud",
    // path唯一别名，在页面跳转或其他路由操作时，可以使用name代替path，避免直接书写繁长的path
    name: "crud",
    // 模板根组件
    component: ModuleMain,
    // 访问/crud时重定向到example子路由
    redirect: "/crud/example",

    /* 模块子路由 */
    children: [
      {
        // 相对路径会自动拼接父路径，最终等价于: /crud/example
        path: "example",
        // 唯一别名
        name: "crudExample",
        // 向页面组件传参，这里是把url后面的查询条件传给页面组件
        props(route) {
          const query = overwrite(new SearchModel(), route.query);
          return { query };
        },
        // 用户访问当前路径时要渲染的页面组件
        component() {
          return import(
            /* webpackChunkName: "crudExample" */
            "@/crud/view/example/Index"
          );
        },
      }
    ]
  }
];

// Page Layout
export default {
  path: "/",
  component() {
    return import(
      /* webpackChunkName: "Layout" */ "@/core/Layout.vue"
    );
  },
  children: routes
};
