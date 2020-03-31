export default class AddEdit {
  // 团队 number
  teamId = null;

  // 应用 string
  appName = null;

  // 数据库名 string
  dbName = null;

  // 库是否存在	Enums(1:存在;2:不存在 默认存在)
  isExist = null;

  // 用途 string
  dbExplain = null;

  // 环境	Enums(1:正式;2:预发;3:沙箱)
  environment = null;
}
