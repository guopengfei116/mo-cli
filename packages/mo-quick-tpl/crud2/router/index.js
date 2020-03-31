import { overwrite } from "mo/object";

import SearchModel from "@/crud2/model/vo/Search";
import ModuleMain from "@/crud2/view/Main";

// Routes
const Crud2Routes = [
  {
    path: "crud2",
    component: ModuleMain,
    redirect: "crud2/online",
    children: [
      {
        name: "crud2Online",
        path: "online",
        props(route) {
          const query = overwrite(new SearchModel(), route.query);
          return { query, env: "online" };
        },
        component() {
          return import(
            /* webpackChunkName: "crud2" */
            "@/crud2/view/list"
          );
        }
      },
      {
        name: "crud2Test",
        path: "test",
        props(route) {
          const query = overwrite(new SearchModel(), route.query);
          return { query, env: "test" };
        },
        component() {
          return import(
            /* webpackChunkName: "crud2" */
            "@/crud2/view/list"
          );
        }
      }
    ]
  }
];

// Page Layout
export default {
  path: "/frontend-refactor",
  component() {
    return import(
      /* webpackChunkName: "Layout" */ "@/core/view/Layout"
    );
  },
  children: Crud2Routes
};
