import { entries2enums } from "mo/object";

// 数据检索时状态分类
export const statusTuple = [
  [20, "可用"],
  [10, "待审核"],
  [30, "审核拒绝"],
  [40, "销毁"]
];
export const optionalStatusTuple = [["", "全部"], ...statusTuple];

// 全值枚举
export const statusEnums = entries2enums(optionalStatusTuple);
