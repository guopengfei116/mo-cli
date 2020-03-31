<template>
  <article>
    <mo-body :title="pageEnv === 'online' ? 'Crud2线上服务' : 'Crud2测试服务'">
      <!-- search -->
      <search
        ref="searchRef"
        :default-data="defaultSearchModel"
        @search="onSearch($event)"
      >
        <mo-button type="secondary" @click="onAdd()">申请</mo-button>
      </search>

      <!-- table -->
      <contents :data="crud2List.data" v-loading="searchLoading">
        <template v-slot="{ row }">
          <mo-button type="text" @click="onDetail(row)">查看</mo-button>
          <mo-button type="text" @click="onHati(row)">Hati</mo-button>
        </template>
      </contents>

      <!-- pagination -->
      <mo-pagination
        ref="paginationRef"
        :total="crud2List.total"
        @change="onPaginationChange"
      ></mo-pagination>
    </mo-body>

    <!-- add edit -->
    <add-edit-dialog></add-edit-dialog>

    <!-- detail -->
    <detail-dialog></detail-dialog>
  </article>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { overwrite } from "mo/object";

import crud2OnlineDao from "@/crud2/dao/online";
import crud2TestDao from "@/crud2/dao/test";
import SearchModel from "@/crud2/model/vo/Search";
import AddEditModel from "@/crud2/model/vo/AddEdit";

import Search from "./Search";
import Contents from "./Contents";
import AddEditDialog from "./AddEditDialog";
import DetailDialog from "./DetailDialog";

export default {
  name: "Crud2Index",

  components: {
    Search,
    Contents,
    AddEditDialog,
    DetailDialog
  },

  props: {
    query: {
      type: SearchModel,
      default: () => new SearchModel()
    },

    env: {
      type: String,
      default: "online"
    }
  },

  data() {
    return {
      searchLoading: false,
      crud2List: {
        data: [],
        totol: 0
      }
    };
  },

  computed: {
    ...mapState("crud2/list", ["defaultSearchModel", "pageEnv"])
  },

  created() {
    this.initPageEnv(this.env);
  },

  mounted() {
    this.search();
  },

  methods: {
    ...mapMutations("crud2/list", [
      "initPageEnv",
      "openDetailDialog",
      "openAddDialog"
    ]),

    async search() {
      this.searchLoading = true;

      const keyword = this.$refs.searchRef.getData();
      const pagination = this.$refs.paginationRef.getData();
      const payload = { ...keyword, ...pagination };

      try {
        if (this.pageEnv === "online") {
          this.crud2List = await crud2OnlineDao.getCrud2List(payload);
        } else {
          this.crud2List = await crud2TestDao.getCrud2List(payload);
        }
      } finally {
        this.searchLoading = false;
      }
    },

    async onSearch() {
      this.search();
    },

    async onPaginationChange() {
      this.search();
    },

    async onAdd() {
      this.openAddDialog({
        title: "Crud2申请"
      });
    },

    async onDetail(row) {
      const payload = { resourceId: row.resourceId };
      let detail = {};

      try {
        if (this.pageEnv === "online") {
          detail = await crud2OnlineDao.getDetail(payload);
        } else {
          detail = await crud2TestDao.getDetail(payload);
        }
      } catch (e) {
        return console.log(e);
      }

      this.openDetailDialog({
        title: `数据库: ${detail.dbName}`,
        data: detail
      });
    },

    async onHati(row) {
      window.open("http://hati.gops.guahao.cn/main/main");
    }
  }
};
</script>
