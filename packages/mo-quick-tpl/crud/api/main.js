export default {
  getXxxList: [
    "get",
    "/api/Xxx",
    {
      priority: Infinity,
      engine: "crud"
    }
  ],

  addXxx: [
    "post",
    "/api/Xxx",
    {
      engine: "crud"
    }
  ],

  updateXxx: [
    "post",
    "/api/Xxx",
    {
      engine: "crud"
    }
  ],

  deleteXxx: [
    "delete",
    "/api/Xxx",
    {
      engine: "crud"
    }
  ]
};
