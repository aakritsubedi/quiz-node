const qaServices = require("./que.service");
const { getApi } = require("../../utils/db/model");

module.exports = {
  fetchAll: async (request, response, next) => {
    try {
      const qas = await qaServices.fetchAll();
      response.status(200).json(getApi({ data: qas }));
    } catch (e) {
      next(e);
    }
  },

  fetchByCategory: async (request, response, next) => {
    const category = request.params.category;
    try {
      const qas = await qaServices.fetchByCategory(category);
      response.status(200).json(getApi({ data: qas }));
    } catch (e) {
      next(e);
    }
  },

  update: async (request, response, next) => {
    const que = request.body;

    try {
      const res = await qaServices.update(que);
      if (res) {
        response.status(200).json(
          getApi({
            data: {
              message: "Updated Successfully",
            },
          })
        );
      }
    } catch (e) {
      next(e);
    }
  },

  insert: async (request, response, next) => {
    const qData = request.body;
    try {
      const res = await qaServices.insert(qData);
      if (res) {
        response.status(200).json(
          getApi({
            data: {
              message: "Inserted Successfully",
            },
          })
        );
      }
    } catch (e) {
      next(e);
    }
  },

  delete: async (request, response, next) => {
    const id = request.params.id;
    try {
      const res = await qaServices.delete(id);
      if (res) {
        response.status(200).json(
          getApi({
            data: {
              message: "Deleted Successfully",
            },
          })
        );
      }
    } catch (e) {
      next(e);
    }
  },
};
