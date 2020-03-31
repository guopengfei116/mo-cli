export default class Search {
  // 团队 number
  teamId = null;

  // 应用 string
  applicationName = null;

  // 数据库名 string
  dbName = null;

  // 审核状态 null:全部 10:待审核 20:可用 30:审核拒绝 40:销毁
  applyStatus = null;

  // 申请人 0:全部;1:我
  applyLoginid = null;

  // 开始时间 dateStr
  begintime = null;

  // 结束时间 dateStr
  endtime = null;

  // 当前页码 number
  pageIndex = null;

  // 每页大小 number
  pageSize = null;
}
