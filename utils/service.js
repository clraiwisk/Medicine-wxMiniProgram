module.exports.service = function(userOption) {
  userOption.url = "http://192.168.110.250:4002" + userOption.url;
  return new Promise((resolve,reject) => {
    wx.request({
      ...userOption,
      header:{
    'Authorization':wx.getStorageSync('token'),
  },
      success: result => {
        resolve(result.data.data)
      }
    })
  })
}