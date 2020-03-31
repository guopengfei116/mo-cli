<template>
  <el-form
    ref="form"
    :model="formModel"
    :rules="modelRules"
    label-width="120px"
    label-position="left"
  >
    <!-- Team -->
    <el-form-item label="团队" prop="teamId">
      <mo-team v-model="formModel.teamId"></mo-team>
    </el-form-item>

    <!-- App -->
    <el-form-item label="应用" prop="appName">
      <mo-app-by-team
        v-model="formModel.appName"
        :team-id="formModel.teamId"
        @change="onAppChange"
      ></mo-app-by-team>
    </el-form-item>

    <el-form-item v-if="pageEnv === 'online'" label="环境" prop="environment">
      <el-select v-model="formModel.environment" placeholder="请选择">
        <el-option label="正式" :value="1"></el-option>
        <el-option label="沙箱" :value="3" :disabled="!hasSandBox"></el-option>
        <el-option label="预发" :value="2" :disabled="true"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      v-if="formModel.environment !== 3"
      label="数据库名称"
      prop="dbName"
      :rules="dbNameRules"
      style="width: 50%"
    >
      <el-input v-model="formModel.dbName"></el-input>
    </el-form-item>

    <el-form-item
      v-if="formModel.environment !== 3"
      label="库是否存在"
      prop="isExist"
      :rules="isExistRules"
    >
      <mo-enums v-model="formModel.isExist" :data="IsExistEnums"></mo-enums>
    </el-form-item>

    <el-form-item label="数据库用途说明" prop="dbExplain">
      <el-input
        v-model="formModel.dbExplain"
        type="textarea"
        :rows="6"
        :placeholder="
          `1、新申请数据库用途
2、应用属于内部应用、外部应用、后台应用
3、是否需要用到搜索，回答内容为：未使用到搜索或者需要使用到搜索
4、新申请数据库是否和老的应用或者库存在任何关联关系，回答内容为：与其他应用无关联或与xxx应用存在关联关联库表为xxxx
5、最大150个字符`
        "
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ruleFactory } from "mo/validator";
import { overwrite, overwriteAll } from "mo/object";
import { Enums } from "mo/class";
import { BaseForm } from "mo-ui/mixin";

import crud2OnlineDao from "@/crud2/dao/online";
import IsExistEnums from "@/crud2/model/enums/IsExist";
import AddEditModel from "@/crud2/model/vo/AddEdit";

const modelRules = {
  teamId: ruleFactory("selectRequired", "请选择团队"),
  appName: ruleFactory("selectRequired", "请选择应用"),
  environment: ruleFactory("selectRequired", "请选择环境"),
  dbExplain: ruleFactory("inputRequired", "请填写数据库用途")
};

export default {
  name: "Crud2AddEditForm",

  mixins: [BaseForm],

  props: {
    defaultData: {
      type: AddEditModel,
      default: () => Object.create(null)
    }
  },

  data() {
    this.modelRules = modelRules;
    this.dbNameRules = ruleFactory("selectRequired", "请填写数据库名称");
    this.isExistRules = ruleFactory("selectRequired", "请选择数据库存在与否");

    this.IsExistEnums = IsExistEnums;
    this.defaultDataCache = null;

    return {
      formModel: null,
      hasSandBox: true
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

  methods: {
    cacheDefaultData() {
      this.defaultDataCache = { ...this.defaultData };
    },

    initModel() {
      this.formModel = overwrite(new AddEditModel(), this.defaultDataCache);
    },

    reset() {
      this.initModel();
      this.$nextTick(() => this.clearValidate());
    },

    // 沙箱模式时候不传dbName与isExist
    getData() {
      if (this.formModel.environment !== 3) {
        return this.formModel;
      }

      return overwriteAll(this.formModel, {
        dbName: null,
        isExist: null
      });
    },

    async onAppChange(applicationName) {
      if (this.pageEnv === "online") {
        this.formModel.environment = 1;
        this.hasSandBox = await crud2OnlineDao.hasSandBox({ applicationName });
      }
    }
  }
};
</script>
