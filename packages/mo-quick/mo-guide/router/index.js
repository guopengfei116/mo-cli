import { NotFound } from "mo-ui/view";
import MainLayout from "mo-guide/view/MainLayout";

export default [
  {
    name: "mo",
    path: "/mo",
    component: MainLayout,
    children: [
      {
        name: "moHttp",
        path: "http",
        component: () =>
          import(/* webpackChunkName: "moHttp" */ "mo-guide/view/HttpMain")
      },
      {
        name: "moUi",
        path: "ui",
        component: () =>
          import(/* webpackChunkName: "moUi" */ "mo-guide/view/UiMain")
      }
    ]
  },
  {
    path: "*",
    component: NotFound
  }
];
