const userServices = require("./users.service");
const { getApi } = require("../../utils/db/model");

module.exports = {
  fetch: async (request, response, next) => {
    let users = null;
    try {
      users = await userServices.fetch();
      response.status(200).json(getApi({ data: users }));
    } catch (e) {
      next(e);
    }
  },
  fetchById: async (request, response, next) => {
    let user = null;
    const id = request.params.id;
    try {
      user = await userServices.fetchById(id);
      if (user.length !== 0) {
        response.status(200).json(getApi({ data: user }));
      }
      next({
        message: "Not found !!!",
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (request, response, next) => {
    let user = null;
    const users = request.body;
    try {
      user = await userServices.create(users);
      if (user) {
        response.status(200).json(
          getApi({
            data: {
              message: "Added Successfully",
            },
          })
        );
      }
    } catch (err) {
      next(err);
    }
  },
  update: async (request, response, next) => {
    let userInfo = null;
    const userData = request.body;

    try {
      userInfo = await userServices.update(userData);
      if (userInfo) {
        response.status(200).json(
          getApi({
            data: {
              message: "Updated Successfully",
            },
          })
        );
      }
    } catch (err) {
      next(err);
    }
  },
  remove: async (request, response, next) => {
    const id = request.params.id;
    try {
      await userServices.remove(id);
      response.status(200).json(
        getApi({
          data: {
            message: "Deleted Successfully",
          },
        })
      );
    } catch (e) {
      next(e);
    }
  },
};
