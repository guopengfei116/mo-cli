import { overwrite } from "mo/object";

import actions from "@/crud2/action/list";
import SearchModel from "@/crud2/model/vo/Search";
import AddEditModel from "@/crud2/model/vo/AddEdit";

const defaultSearchModel = overwrite(new SearchModel(), {});
Object.freeze(defaultSearchModel);

const defaultAddEditModel = overwrite(new AddEditModel(), {
  environment: 1
});
Object.freeze(defaultAddEditModel);

const state = {
  pageEnv: "online",
  defaultSearchModel,

  addEditDialog: {
    visible: false,
    mode: "add",
    title: "",
    data: defaultAddEditModel
  },

  detailDialog: {
    visible: false,
    title: "",
    data: {}
  }
};

const getters = {};

const mutations = {
  initPageEnv(state, payload) {
    state.pageEnv = payload;
    console.log(state.pageEnv);
  },

  openDetailDialog(state, payload) {
    state.detailDialog = {
      ...state.detailDialog,
      ...payload,
      visible: true
    };
    console.log(payload);
  },

  closeDetailDialog(state, payload) {
    state.detailDialog = {
      ...state.detailDialog,
      visible: false
    };
  },

  openAddDialog(state, payload) {
    state.addEditDialog = {
      ...state.addEditDialog,
      ...payload,
      mode: "add",
      visible: true
    };
  },

  openEditDialog(state, payload) {
    state.addEditDialog = {
      ...state.addEditDialog,
      ...payload,
      mode: "edit",
      visible: true
    };
  },

  closeAddEditDialog(state, payload) {
    state.addEditDialog = {
      ...state.addEditDialog,
      visible: false
    };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
