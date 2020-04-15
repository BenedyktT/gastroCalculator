const { Cache } = require("../../services/cache");

module.exports = async (req, res, next) => {
  await next();
  await Cache.clearCache();
};
