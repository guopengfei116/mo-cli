import { createNamespacedHelpers } from "mo/http";

const request = createNamespacedHelpers("crud/enums");

export const getNavMenus = async payload => {
  const res = await request("getNavMenus")(payload);
  const data = res.data.data;

  return data;
};
