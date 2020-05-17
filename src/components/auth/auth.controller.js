const userService = require("../users/users.service");
console.log("test");
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
      response.json(userData);
    } catch (e) {
      next(e);
    }
  },
};
