import { Enums } from "mo/class";

// 硬盘规格
export const diskTuple = [
  ["100G", "100G"],
  ["200G", "200G"],
  ["300G", "300G"],
  ["500G", "500G"],
  ["1024G", "1024G"]
];

export default Enums.create(diskTuple, 0, 1);
