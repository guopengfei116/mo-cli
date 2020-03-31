const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");

module.exports = function(targetDir, options) {
  const templateDir = path.dirname(require.resolve("@weiyi/mo-quick"));

  console.log(`✨`, `创建项目: ${chalk.yellow(targetDir)}.`)
  fse.copy(templateDir, targetDir)
      .then(() => console.log(`🎉`, `创建成功!`))
      .catch(e => console.log(e));
}
