<script>
import { mapState } from "vuex";
import { isDisabledDate } from "mo-ui/lib";

export default {
  name: "moguideUi",

  data() {
    return {
      dateRange: ["2008-10-01", "2020-05-01"]
    };
  },

  computed: {
    ...mapState("moguide", ["title", "introduce"])
  },

  methods: {
    message(msg) {
      console.log(msg);
    }
  },

  render() {
    return (
      <article>
        <h1 style={{ textAlign: "center" }}>{this.introduce}</h1>

        <dl>
          <dt>MoButton</dt>
          <dd>
            <mo-button
              type="primary"
              onClick={this.message.bind(this, "primary")}
            >
              主要
            </mo-button>
            <mo-button
              type="secondary"
              onClick={this.message.bind(this, "secondary")}
            >
              次要
            </mo-button>
            <mo-button type="warn" onClick={this.message.bind(this, "warn")}>
              警告
            </mo-button>
            <mo-button
              type="danger"
              onClick={this.message.bind(this, "danger")}
            >
              危险
            </mo-button>
            <mo-button type="plain" onClick={this.message.bind(this, "plain")}>
              朴素
            </mo-button>
            <mo-button type="text" onClick={this.message.bind(this, "text")}>
              文本
            </mo-button>
          </dd>
        </dl>

        <dl>
          <dt>MoPagination</dt>
          <dd>
            <mo-pagination
              total={20}
              pageSizes={[2, 4, 6]}
              onChange={this.message}
            ></mo-pagination>
          </dd>
        </dl>

        <dl>
          <dt>MoPaginationOffset</dt>
          <dd>
            <mo-pagination-offset
              total={100}
              onChange={this.message}
            ></mo-pagination-offset>
          </dd>
        </dl>

        <dl>
          <dt>MoPlainText</dt>
          <dd>
            <mo-plain-text
              data={{
                name: "Mo",
                birthday: "20200312"
              }}
              strategy={[
                { label: "姓名:", key: "name" },
                { label: "生日:", key: "birthday" }
              ]}
              label-width="60px"
            ></mo-plain-text>
          </dd>
        </dl>

        <dl>
          <dt>MoDateRangePicker</dt>
          <dd>
            <mo-date-range-picker
              value={this.dateRange}
              type="monthrange"
              value-format="yyyy-MM"
              clearable={true}
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              shortcuts-as={{
                rules: ["month/2-0", "month/5-0", "year/0-0"],
                maxLimit: new Date()
              }}
              picker-options={{
                disabledDate: isDisabledDate
              }}
              onInput={v => {
                this.dateRange = v;
                this.message(v);
              }}
            ></mo-date-range-picker>
          </dd>
        </dl>

        <dl>
          <dt>mo-closure</dt>
          <dd>
            <mo-closure
              v1={666}
              v2={888}
              sum={666 + 888}
              scopedSlots={{
                default(scope) {
                  return <p>{`${scope.v1}+${scope.v2}=${scope.sum}`}</p>;
                }
              }}
            ></mo-closure>
          </dd>
        </dl>
      </article>
    );
  }
};
</script>
