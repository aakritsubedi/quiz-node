const { getApi } = require("../utils/db/model");

module.exports = {
  errorHandler: (errors, req, res, next) => {
    res
      .status(errors.status || 500)
      .json(
        getApi({
          error: { ...errors, message: errors.message, status: errors.status },
        })
      );
  },
};
