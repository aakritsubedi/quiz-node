const qaServices = require("./que.service");

module.exports = {
  fetchAll: async (request, response, next) => {
    try {
      const qas = await qaServices.fetchAll();
      response.json(qas);
    } catch (e) {
      next(e);
    }
  },

  fetchByCategory: async (request, response, next) => {
    const category = request.params.category;
    try {
      const qas = await qaServices.fetchByCategory(category);
      response.json(qas);
    } catch (e) {
      next(e);
    }
  },

  update: async (request, response, next) => {
    const id = request.params.id;

    try {
      const res = await qaServices.update(id);
      if (res) {
        response.json({
          message: "Updated Successfully",
        });
      }
    } catch (e) {
      next(e);
    }
  },

  insert: async (request, response, next) => {
    const data = request.body;

    try {
      const res = await qaServices.insert(data);
      if (res) {
        response.json({
          message: "Inserted Successfully",
        });
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
        response.json({
          message: "Deleted Successfully",
        });
      }
    } catch (e) {
      next(e);
    }
  },
};
