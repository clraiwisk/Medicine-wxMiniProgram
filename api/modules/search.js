const service = require("../../utils/service").service

module.exports.searchList = (name) => service({url:`/medicine/product/list?name=${name}&dscp=${name}`});