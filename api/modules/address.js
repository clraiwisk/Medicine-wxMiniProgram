const service = require("../../utils/service").service

module.exports.getUserAddress = (id) => service({url: "/medicine/address/user/" + id})
module.exports.getAddress = (id) => service({url: "/medicine/address/" + id})
module.exports.addAddress = (data) => service({url: "/medicine/address", method:"post",data})
module.exports.updateAddress = (data) => service({url: "/medicine/address",method:"put",data})
module.exports.removeAddress = (id) => service({url: "/medicine/address/" + id,method:"delete"})