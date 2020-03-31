const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");

module.exports = function(distDir, options) {
  // const templateDir = path.resolve(__dirname, "../../");
  const templateDir = path.dirname(require.resolve("@weiyi/mo-quick-tpl"));
  const generator = new Generator(templateDir, distDir, options);

  if (options.module) {
    generator.gModule(options);
  }

  if (options.component) {
    generator.gComponent(options);
  }
}

class Generator {
  static moduleTpls = ["crud"];
  static componentTpls = [];

  constructor(source, target, options) {
    this.baseSource = source;
    this.baseTarget = target;
    this.options = options;
  }

  gModule(options) {
    let { module: moduleName, template: templateId } = options;
    console.log(`📦`, `添加新模块: ${chalk.yellow(moduleName)}`);

    if (!Generator.moduleTpls.includes(templateId)) {
      console.log(chalk.blue(".."), `指定模板未匹配: ${chalk.yellow(templateId)}, 采用默认模板: ${chalk.yellow("crud")}`);
      templateId = "crud";
    } else {
      console.log(chalk.blue(".."), `匹配模板类型: ${chalk.yellow(templateId)}`);
    }

    const sourceDir = path.resolve(this.baseSource, templateId);
    const targetDir = path.resolve(this.baseTarget, moduleName);

    console.log(chalk.blue(".."), `开始创建: ${chalk.yellow(targetDir)}`);
    fse.copy(sourceDir, targetDir)
      .then(() => {
        console.log(chalk.green('✔ '), `创建成功！`);
      })
      .catch(e => console.log(e));
  }

  gComponent() {

  }
}
