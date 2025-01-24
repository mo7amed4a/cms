export default {
  routes: [
    {
      method: "GET",
      path: "/contacts/check-all-data",
      handler: "contact.checkAllData",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/contacts/read-all-data",
      handler: "contact.readAllData",
      config: {
        auth:false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
