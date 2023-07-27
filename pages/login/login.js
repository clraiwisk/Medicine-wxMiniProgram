// pages/profile/profile.js
const api = require("../../api/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:{
      username:"",
      password:""
    }
  },
  setUserName(e){
    const username = e.detail.value
    this.setData({"model.username": username})
  },
  setPassWord(e){
    const password = e.detail.value
    this.setData({"model.password": password})
  },
  async login() {
    const item = await api.login.login(this.data.model)
    console.log(this.data.model)
    if(item === null){
      wx.lin.showToast({
        title:"用户名或错误"
      })
    }else{
      wx.setStorageSync('userId', item.id)
      wx.setStorageSync('name', item.nickname)
      wx.setStorageSync('avatar', item.avatar)
      wx.switchTab({
        url: '/pages/profile/profile',
      })
      wx.lin.showToast({
        title:"登录成功！"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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