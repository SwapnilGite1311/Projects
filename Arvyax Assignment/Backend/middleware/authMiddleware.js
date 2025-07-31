module.exports = function (req, res, next) {
  // your auth logic (add JWT check here if needed)
  next();
};