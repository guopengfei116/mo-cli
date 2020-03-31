<template>
  <el-steps
    v-bind="$attrs"
    :active="active"
    align-center
    finish-status="success"
    :process-status="
      data.applyType ? 'error' : data.applyStatus === 20 ? 'success' : 'finish'
    "
  >
    <el-step title="提交申请" :description="data.applyName"> </el-step>
    <el-step title="直接主管审核" :description="data.managerLoginName">
    </el-step>
    <el-step title="资源负责人审核" :description="data.dbaLoginName"> </el-step>
    <el-step
      title="审核结果"
      :status="
        data.applyType
          ? 'error'
          : data.applyStatus === 20
          ? 'success'
          : 'process'
      "
      :description="
        data.applyType ? '不通过' : data.applyStatus === 20 ? '通过' : '审核中'
      "
    >
    </el-step>
  </el-steps>
</template>

<script>
export default {
  name: "MoStepAudit",

  props: {
    data: Object
  },

  computed: {
    // applyType 0:审核通过;1:审核拒绝
    // applyStatus 20:审核通过;50:主管审核;60:资源负责人审核;40:销毁;30:审核拒绝
    active() {
      let result = 0;
      const isReject = this.data.applyType;
      const applyStatus = this.data.applyStatus;

      if (isReject) {
        if (applyStatus === 50) result = 1;
        if (applyStatus === 60) result = 2;
      } else {
        if (applyStatus === 20) result = 3;
        if (applyStatus === 50) result = 1;
        if (applyStatus === 60) result = 2;
      }

      return result;
    }
  }
};
</script>
