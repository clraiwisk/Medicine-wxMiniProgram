const service = require("../../utils/service").service

module.exports.addOrder = (data) => service({url:'/medicine/order',method:'post',data});
module.exports.getCount = (userId) => service({url:'/medicine/order/count/'+userId});
module.exports.getOrderList = (userId) => service({url:'/medicine/order/'+userId});
module.exports.getModel = (id) => service({url:'/medicine/order/detail/'+id});
module.exports.removeOrder = (id) => service({url:'/medicine/order/'+id, method:'delete'});
module.exports.updateOrder = (data) => service({url:`/medicine/order/${data.id}/${data.status}`,method:'put'});
module.exports.getStatusOrder = (data) => service({url:`/medicine/order/${data.userId}?status=${data.status}`});

