const app = require("../dist/index").default;

module.exports = (req, res) => {
  return app(req, res);
};
