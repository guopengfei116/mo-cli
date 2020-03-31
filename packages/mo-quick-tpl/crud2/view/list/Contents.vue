<script>
export default {
  name: "Crud2Contents",

  functional: true,

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  render(h, context) {
    const { data } = context.props;
    const { directives, attrs } = context.data;

    return (
      <el-table data={data} border {...{ directives, attrs }}>
        <el-table-column
          prop="teamName"
          label="团队"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="applicationName"
          label="应用"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="finalAttribute"
          label="数据库名"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="applyLoginName"
          label="申请人"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="applyTime"
          label="申请时间"
          align="center"
          show-overflow-tooltip={true}
        ></el-table-column>

        <el-table-column
          prop="applyStatus"
          label="状态"
          align="center"
          show-overflow-tooltip={true}
        ></el-table-column>

        <el-table-column
          prop="note"
          label="申请说明"
          align="center"
          show-overflow-tooltip={true}
        ></el-table-column>

        <el-table-column
          label="操作"
          align="center"
          scopedSlots={context.scopedSlots}
        ></el-table-column>
      </el-table>
    );
  }
};
</script>
