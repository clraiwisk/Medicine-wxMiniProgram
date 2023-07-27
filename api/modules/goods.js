const service = require("../../utils/service").service

module.exports.getProduct = (id) => service({url: "/medicine/product/"+id})