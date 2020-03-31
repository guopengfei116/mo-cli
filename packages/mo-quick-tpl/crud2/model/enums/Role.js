import { entries2enums } from "mo/object";

// 数据检索时角色分类: 全部 我
export const RoleTuple = [[1, "我"]];
export const optionalRoleTuple = [["", "全部"], ...RoleTuple];

// 全值枚举
export const RoleEnums = entries2enums(optionalRoleTuple);
