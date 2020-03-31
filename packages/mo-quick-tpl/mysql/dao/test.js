import { api, apiInject } from "./node_modules/mo/http-decorator";

@api({
  baseUrl: "/api/crud2Test/",
  method: "get",
  engine: "core"
})
class Crud2Online {
  // api作为第一个参数注入，用户调用时传的参数依次排在后面
  @apiInject({
    url: "getList",
    engine: "core"
  })
  static async getCrud2List(api, payload) {
    // 对发送的数据做处理
    payload.pageNumber = payload.pageIndex;

    // 发送请求
    const res = await api(payload);

    // 对响应的数据做处理
    const { totalCount, results } = res.data.data;
    const crud2List = { total: totalCount, data: results };

    // 返回数据
    return crud2List;
  }

  @apiInject({
    url: "checkSandBox",
    method: "post"
  })
  static async hasSandBox(api, payload) {
    const res = await api(payload);
    const data = res.data.data;

    // 0:不允许创建 1:允许创建
    return data.sandBoxAllowType === 1;
  }

  @apiInject({
    url: "viewDetails"
  })
  static async getDetail(api, payload) {
    const res = await api(payload);
    const data = res.data.data;

    return data;
  }

  @apiInject({
    url: "add",
    method: "post"
  })
  static async addCrud2(api, payload) {
    const res = await api(payload);
    const data = res.data.data;

    return data;
  }

  @apiInject({
    url: "getFinalAttr"
  })
  static async getNameList(api, payload) {
    const res = await api(payload);
    const data = res.data.data;

    return data;
  }
}

export default Crud2Online;
