const service = require("../../utils/service").service

module.exports.getHistory = (userId) => service({url: "/medicine/api/productHistory/" + userId})
module.exports.removeHistory = (id) => service({url: "/medicine/api/productHistory/" + id,method:'delete'})
module.exports.addHistory = (data) => service({url: "/medicine/api/productHistory",method:'post',data})