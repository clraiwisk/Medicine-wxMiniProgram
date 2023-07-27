// pages/profile/profile.js
const api = require("../../api/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:null,
    nickName:"",
    avatar:"",
    mainBar:{
      historyCount:0,
      shopCount:0
    },
    model:{
      userId:0,
      status:-11
    },
    fukuanCount:0,
    fahuoCount:0,
    shouhuoCount:0,
    tuikuanCount:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    if(this.data.userId === null) {
      const userId = wx.getStorageSync('userId')
      this.setData({userId})
      const nickName = wx.getStorageSync('name')
      const avatar = wx.getStorageSync('avatar')
      this.setData({'nickName': nickName})
      this.setData({avatar})
      return
    }else{
      const collectList = await api.collect.getCollect(userId)
      this.setData({'mainBar.shopCount': collectList.length})
      const historyList = await api.history.getHistory(userId)
      this.setData({'mainBar.historyCount': historyList.length})
    }
  },
  async payStatus(){
    this.setData({'model.status': -1})
    const statutList =  await api.order.getStatusOrder(this.data.model)
    const item = JSON.stringify(statutList)
    wx.navigateTo({
      url: `/pages/statusOrder/statusOrder?list=${item}&s=-1`,
    })
  },
  async fahuoStatus(){
    this.setData({'model.status': 0})
    const statutList =  await api.order.getStatusOrder(this.data.model)
    const item = JSON.stringify(statutList)
    wx.navigateTo({
      url: `/pages/statusOrder/statusOrder?list=${item}&s=0`,
    })
  },
  async shouhuoStatus() {
    this.setData({'model.status': 1})
    const statutList =  await api.order.getStatusOrder(this.data.model)
    const item = JSON.stringify(statutList)
    wx.navigateTo({
      url: `/pages/statusOrder/statusOrder?list=${item}&s=1`,
    })
  },
  async tuikuanStatus(){
    this.setData({'model.status': 3})
    const statutList =  await api.order.getStatusOrder(this.data.model)
    const item = JSON.stringify(statutList)
    wx.navigateTo({
      url: `/pages/statusOrder/statusOrder?list=${item}&s=3`,
    })
  },
  goLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  exitLogin(){
    wx.showModal({
      title: '提示',
      content: '确定要退出吗？',
      complete: async (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          wx.removeStorageSync('userId')
          wx.removeStorageSync('name')
          wx.removeStorageSync('avatar')
          wx.showToast({
            title: '退出登录成功',
            type:"success"
          })
          const nickName = wx.getStorageSync('name')
          const avatar = wx.getStorageSync('avatar')
          this.setData({'nickName': nickName})
          this.setData({avatar})
          const userId = wx.getStorageSync('userId')
          this.setData({userId})
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const nickName = wx.getStorageSync('name')
    const avatar = wx.getStorageSync('avatar')
    this.setData({'nickName': nickName})
    this.setData({avatar})
    const userId = wx.getStorageSync('userId')
    this.setData({userId})
    this.setData({"model.userId": userId})
    if(this.data.userId === '') {
      return
    }else{
      const collectList = await api.collect.getCollect(userId)
      this.setData({'mainBar.shopCount': collectList.length})
      const historyList = await api.history.getHistory(userId)
      this.setData({'mainBar.historyCount': historyList.length})
      this.setData({'model.status': -1})
      const fukuanList =  await api.order.getStatusOrder(this.data.model)
      this.setData({fukuanCount: fukuanList.length})
      this.setData({'model.status': 0})
      const fahuoList =  await api.order.getStatusOrder(this.data.model)
      this.setData({fahuoCount: fahuoList.length})
      this.setData({'model.status': 1})
      const shouhuoList =  await api.order.getStatusOrder(this.data.model)
      this.setData({shouhuoCount: shouhuoList.length})
      this.setData({'model.status': 3})
      const tuikuanList =  await api.order.getStatusOrder(this.data.model)
      this.setData({tuikuanCount: tuikuanList.length})
      console.log(123)
    }
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