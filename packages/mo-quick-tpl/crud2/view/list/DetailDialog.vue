<template>
  <el-dialog
    v-bind="detailDialog"
    :close-on-click-modal="false"
    @opened="onOpend"
    @close="onClose"
    width="600px"
  >
    <!-- Form -->
    <detail ref="form" :data="detailDialog.data"></detail>

    <!-- Toolbar -->
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="onSubmit" type="primary">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Detail from "./Detail";

export default {
  name: "Crud2DetailDialog",

  components: {
    Detail
  },

  data() {
    this.detailRef = null;
    return {};
  },

  computed: {
    ...mapState("crud2/list", ["pageEnv", "detailDialog"])
  },

  methods: {
    ...mapMutations("crud2/list", ["closeDetailDialog"]),

    onOpend() {
      this.detailRef = this.$refs["form"];
    },

    async onClose() {
      this.closeDetailDialog();
    },

    async onSubmit() {
      this.closeDetailDialog();
      this.$emit("close");
    }
  }
};
</script>
