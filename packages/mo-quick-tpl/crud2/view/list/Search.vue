<template>
  <mo-search>
    <template v-slot:default>
      <!-- Search Form -->
      <el-form ref="form" :model="formModel" :inline="true">
        <!-- Team -->
        <el-form-item label="团队">
          <mo-team v-model="formModel.teamId"></mo-team>
        </el-form-item>

        <!-- App -->
        <el-form-item label="应用">
          <mo-app-by-team
            v-model="formModel.appName"
            :team-id="formModel.teamId"
          ></mo-app-by-team>
        </el-form-item>

        <el-form-item label="数据库名" prop="dbName">
          <mo-enums v-model="formModel.dbName" :data="nameEnums"></mo-enums>
        </el-form-item>

        <el-form-item label="状态" prop="applyStatus">
          <el-select
            v-model="formModel.applyStatus"
            clearable
            placeholder="状态"
          >
            <el-option
              v-for="item in optionalStatusTuple"
              :key="item[0]"
              :value="item[0]"
              :label="item[1]"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请人" prop="applyLoginid">
          <el-select
            v-model="formModel.applyLoginid"
            clearable
            placeholder="申请人"
          >
            <el-option
              v-for="item in optionalRoleTuple"
              :key="item[0]"
              :value="item[0]"
              :label="item[1]"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- Date Range -->
        <el-form-item label="创建时间">
          <mo-date-range-picker
            v-model="dateEntries"
            value-format="yyyy-MM-dd"
            type="daterange"
            :clearable="true"
            :shortcutsAs="{
              rules: [
                'day/6-0',
                'day/14-0',
                'month/0-0',
                'month/1-1',
                'month/2-0',
                'month/5-0',
                'year/0-0',
                'year/1-1'
              ]
            }"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </mo-date-range-picker>
        </el-form-item>
      </el-form>
    </template>

    <!-- Toolbar -->
    <template v-slot:toolbar>
      <mo-button type="primary" @click="onSearch()">查询</mo-button>
      <mo-button type="danger" @click="onReset()">重置</mo-button>
      <slot></slot>
    </template>
  </mo-search>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
import { overwriteAll } from "mo/object";
import { Enums } from "mo/class";
import { BaseForm } from "mo-ui/mixin";
import crud2OnlineDao from "@/crud2/dao/online";
import crud2TestDao from "@/crud2/dao/test";

import { optionalStatusTuple } from "@/crud2/model/enums/Status";
import { optionalRoleTuple } from "@/crud2/model/enums/Role";
import SearchModel from "@/crud2/model/vo/Search";

export default {
  name: "Crud2Search",

  mixins: [BaseForm],

  props: {
    defaultData: {
      type: SearchModel,
      required: true
    }
  },

  data() {
    this.optionalStatusTuple = optionalStatusTuple;
    this.optionalRoleTuple = optionalRoleTuple;
    this.defaultDataCache = null;

    return {
      dateEntries: null,
      formModel: null,
      nameEnums: new Enums()
    };
  },

  computed: {
    ...mapState("crud2/list", ["pageEnv"])
  },

  watch: {
    defaultData() {
      if (this.defaultData === this.formModel) return;

      this.cacheDefaultData();
      this.reset();
    }
  },

  created() {
    this.cacheDefaultData();
    this.initModel();
  },

  mounted() {
    this.initNameList();
  },

  methods: {
    cacheDefaultData() {
      this.defaultDataCache = { ...this.defaultData };
    },

    initModel() {
      this.formModel = overwriteAll(new SearchModel(), this.defaultDataCache);
      const { beginTime, endTime } = this.formModel;

      if (beginTime && endTime) {
        this.dateEntries = [beginTime, endTime];
      } else {
        this.dateEntries = [];
      }
    },

    async initNameList() {
      let nameList = [];

      if (this.pageEnv === "online") {
        nameList = await crud2OnlineDao.getNameList();
      } else {
        nameList = await crud2TestDao.getNameList();
      }

      this.nameEnums = Enums.create(nameList);
    },

    reset() {
      this.initModel();
      this.$nextTick(() => this.clearValidate());
    },

    getData() {
      let beginTime = null;
      let endTime = null;

      if (this.dateEntries) {
        [beginTime, endTime] = this.dateEntries;
      }

      return overwriteAll(this.formModel, {
        beginTime,
        endTime
      });
    },

    onSearch() {
      this.$emit("search", this.formModel);
    },

    onReset() {
      this.reset();
    }
  }
};
</script>
