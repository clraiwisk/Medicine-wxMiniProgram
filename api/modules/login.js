const service = require("../../utils/service").service

module.exports.login = (data) => service({
  url: `/medicine/user/login?username=${data.username}&password=${data.password}`
});

