// pages/address/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:{
      id:0,
      receiverName:"",
      receiverPhone:"",
      addr:"",
      area:"",
      province:"",
      userId:"",
      city:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = wx.getStorageSync('userId')
    this.setData({'model.userId': id})
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('beginUpdate', model => this.setData({model}))
  },
  save() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('ok',this.data.model)
    wx.navigateBack()
  },
  setReceiveName(e) {
    const receiveName =  e.detail.value
    this.setData({'model.receiverName' : receiveName})
  },
  setReceivePhone(e) {
    const receivePhone =  e.detail.value
    this.setData({'model.receiverPhone' : receivePhone})
  },
  setProvince(e) {
    const province =  e.detail.value
    this.setData({ 'model.province' : province})
  },
  setCity(e) {
    const city =  e.detail.value
    this.setData({'model.city': city})
  },
  setArea(e) {
    const area =  e.detail.value
    this.setData({'model.area': area})
  },
  setAddr(e) {
    const addr =  e.detail.value
    this.setData({'model.addr': addr})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})