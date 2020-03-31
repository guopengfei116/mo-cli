<script>
const strategy = [
  { label: "团队", key: "teamName" },
  { label: "应用", key: "appName" },
  { label: "数据库名", key: "dbName" },
  { label: "申请人", key: "dbApplier" },
  { label: "申请人名称", key: "dbApplierName" },
  { label: "库是否存在", key: "isExist", formatter: value => `${value === 1}` },
  { label: "申请用途", key: "note", span: 24 }
];

export default {
  name: "Crud2Details",

  props: {
    data: Object
  },

  render() {
    return (
      <section>
        <mo-plain-text
          data={this.data}
          strategy={strategy}
          style={{ margin: "0 30px 40px 30px", fontSize: "14px" }}
        ></mo-plain-text>
        <mo-step-audit data={this.data}></mo-step-audit>
      </section>
    );
  }
};
</script>
