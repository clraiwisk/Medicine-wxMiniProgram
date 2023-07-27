const service = require("../../utils/service").service

module.exports.getCarousel = () => service({url: "/medicine/carousel"})
module.exports.getRecommend = () => service({url: "/medicine/recommend"})
