module.exports = function errorHandler(error, req, res, next) {
  var a = "aakrit ";
  console.log("aarit ")
  res.status(error.status || 500).json(error.message);
}
