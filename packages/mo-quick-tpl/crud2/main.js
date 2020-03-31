import router from "./router";
import store from "./store";

const MODULE_NAME = "crud2";

export default ({ registerRouter, registerStore, registerApi }) => {
  registerRouter(MODULE_NAME, router);
  registerStore(MODULE_NAME, store);
};
