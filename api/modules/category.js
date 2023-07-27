const service = require("../../utils/service").service

module.exports.getCategory = () => service({url: "/medicine/category/list"})
module.exports.getListSub = (id) => service({url: "/medicine/category/product/"+id})
module.exports.addCart = (data) => service({url: "/medicine/shopcart", method:"post",data})