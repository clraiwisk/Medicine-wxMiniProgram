const service = require("../../utils/service").service

module.exports.addCollect = (data) => service({url: "/medicine/api/collect",method:"post",data})
module.exports.getCollect = (id) => service({url: "/medicine/api/collect/"+id})
module.exports.removeCollect = (id) => service({url: "/medicine/api/collect/"+id,method:"delete"})