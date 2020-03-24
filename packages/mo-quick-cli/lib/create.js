const path = require("path");
const fse = require("fs-extra");

module.exports = function(targetDir, options) {
  const templateDir = path.dirname(require.resolve("mo-quick"));

  console.log("初始化项目...");
  fse.copy(templateDir, targetDir)
      .then(() => console.log(`项目创建成功: ${targetDir}`))
      .catch(e => console.log(e));
}
