const userService = require("../users/users.service");

// console.log("test");

const { getApi } = require("../../utils/db/model");


module.exports = {
  login: async (request, response, next) => {
    const user = request.body;
    try {
      const userData = await userService.login(user);
      if (!userData) {
        next({
          message: "Coudn't login !!!",
        });
      }

      response.status(200).json(getApi({ data: userData }));
    } catch (e) {
      next(e);
    }
  },
};
