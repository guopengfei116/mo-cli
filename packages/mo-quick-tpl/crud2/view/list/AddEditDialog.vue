<template>
  <el-dialog
    v-bind="addEditDialog"
    :close-on-click-modal="false"
    @opened="onOpend"
    @close="onClose"
    width="700px"
  >
    <!-- Form -->
    <add-edit-form
      ref="formRef"
      :default-data="addEditDialog.data"
    ></add-edit-form>

    <!-- Toolbar -->
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="onClose">
          取 消
        </el-button>
        <el-button @click="onSubmit" type="primary">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Message } from "element-ui";

import crud2OnlineDao from "@/crud2/dao/online";
import crud2TestDao from "@/crud2/dao/test";
import AddEditModel from "@/crud2/model/vo/AddEdit";
import AddEditForm from "./AddEditForm";

export default {
  name: "Crud2AddEditDialog",

  components: {
    AddEditForm
  },

  data() {
    this.formRef = null;

    return {};
  },

  computed: {
    ...mapState("crud2/list", ["pageEnv", "addEditDialog"])
  },

  methods: {
    ...mapMutations("crud2/list", ["closeAddEditDialog"]),

    onOpend() {
      this.formRef = this.$refs["formRef"];
    },

    onClose() {
      this.formRef.clearValidate();
      this.closeAddEditDialog();
      this.$emit("close");
    },

    async onSubmit() {
      try {
        await this.formRef.validate();
        console.warn("数据校验通过，准备提交数据");
      } catch (e) {
        return console.warn("数据校验未通过");
      }

      const data = this.formRef.getData();
      try {
        if (this.pageEnv === "online") {
          await crud2OnlineDao.addCrud2(data);
        } else {
          await crud2TestDao.addCrud2(data);
        }
        Message.success("申请成功!");
      } catch (e) {
        return console.error(e);
      }

      this.closeAddEditDialog();
      this.$emit("submit-successful", data);
    }
  }
};
</script>
