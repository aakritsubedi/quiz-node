module.exports = {
  getApi: (params) => {
    return {
      data: params.data,
      error: params.error,
    };
  },
};
