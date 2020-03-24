const path = require("path");
const fse = require("fs-extra");

module.exports = function(distDir, options) {
  // const templateDir = require("mo-tpl").resolve();
  const templateDir = path.resolve(process.env.MO_CLI_HOME, "./mom-tpl");
  const generator = new Generator(templateDir, distDir, options);

  if (options.module) {
    generator.gModule(options.module);
  }

  if (options.component) {
    generator.gComponent(options.component);
  }
}

class Generator {
  constructor(source, target, options) {
    this.baseSource = source;
    this.baseTarget = target;
    this.options = options;
  }

  gModule(moduleName) {
    const sourceDir = path.resolve(this.baseSource, "./crud");
    const targetDir = path.resolve(this.baseTarget, moduleName);

    fse.copy(sourceDir, targetDir)
      .then(() => console.log(`模块创建成功: ${targetDir}`))
      .catch(e => console.log(e));
  }

  gComponent() {

  }
}
