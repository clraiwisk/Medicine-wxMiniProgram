const service = require("../../utils/service").service

module.exports.getCartList = (id) => service({url: "/medicine/shopcart/" + id})
module.exports.removeCartList = (id) => service({url: "/medicine/shopcart/" + id,method:"delete"})
module.exports.addCart = (data) => service({url: "/medicine/shopcart", method:"post",data})
module.exports.count = (data) => service({url: `/medicine/shopcart/addorminus?id=${data.id}&value=${data.value}`,method:"post"})