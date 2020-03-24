#!/usr/bin/env node

const path = require("path");
const { program } = require("commander");
const { camelCase } = require("lodash");

// @mo
process.env.MO_CLI_HOME = path.resolve(__dirname, '../../');

program
  .version(`mo-cli ${require("../package").version}`)
  .usage("<command> [options]");

program
  .command("create <appName> [dir]")
  .alias("c")
  .description("创建新项目")
  .action((appName, dir = "./", cmd) => {
    const appDir = path.resolve(process.cwd(), dir, appName);
    const options = extractOptions(cmd);
    require("../lib/create")(appDir, options);
  });

program
  .command("generator [dir]",)
  .alias("g")
  .description("代码模板生成器")
  .option("-m, --module <moduleName>", "创建新模块")
  .option("-c, --component <componentsName>", "添加组件")
  .option("-t, --template <templateId>", "模块或组件等类型代码模板的名称", "crud")
  .option("-f --force", "冲突时强制覆盖原目录或文件")
  .allowUnknownOption()
  .action((dir = "./src", cmd) => {
    const distDir = path.resolve(process.cwd(), dir);
    const options = extractOptions(cmd);
    require("../lib/generator")(distDir, options);
  });

program.parse(process.argv);

function extractOptions(cmd) {
  return cmd.options.reduce((options, item) => {
    const key = camelCase(item.long.replace(/^--/, ""));

    if (typeof cmd[key] !== 'function') {
      options[key] = cmd[key];
    }

    return options;
  }, {});
}
