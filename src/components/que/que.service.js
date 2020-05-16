const qaModel = require("./que.model");

module.exports = {
  fetchAll: async () => {
    let qas = null;
    try {
      qas = await qaModel.fetchAll();
    } catch (e) {
      throw e;
    }
    return qas;
  },
  fetchByCategory: async (category) => {
    let qas = null;
    try {
      qas = await qaModel.fetchByCategory(category);
    } catch (e) {
      throw e;
    }
    return qas;
  },

  update: async (que) => {
    let res = null;
    try {
      res = await qaModel.update(que);
    } catch (e) {
      throw e;
    }
    return res;
  },

  insert: async (que) => {
    let res = null;
    try {
      res = await qaModel.insert(que);
    } catch (e) {
      throw e;
    }
    return res;
  },

  delete: async (id) => {
    let res = null;
    try {
      res = await qaModel.delete(id);
    } catch (e) {
      throw e;
    }
    return res;
  },
};
